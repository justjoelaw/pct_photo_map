import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateJournalEntryMutation, useDeleteJournalEntryMutation } from './journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';

const EditJournalEntryForm = ({ users, journalEntry }) => {
  const [updateJournalEntry, { isLoading, isSuccess, isError, error }] = useUpdateJournalEntryMutation();
  const [deleteJournalEntry, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteJournalEntryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(journalEntry.title);
  const [date, setDate] = useState(journalEntry.date.substring(0, 10));
  const [journalText, setJournalText] = useState(journalEntry.journalText);
  const [userId, setUserId] = useState(journalEntry.user);
  const [latitude, setLatitude] = useState(journalEntry.latitude || 0);
  const [longitude, setLongitude] = useState(journalEntry.longitude || 0);
  const [validLocation, setValidLocation] = useState(true);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setJournalText('');
      setDate('');
      setUserId(users[0].id);
      navigate('/journalEntrys');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    verifyLocation(latitude, longitude, setValidLocation);
  }, [latitude, longitude]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleJournalTextChange = (e) => {
    setJournalText(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const noteBody = {
      id: journalEntry.id,
      title,
      journalText,
      date,
      user: userId,
      latitude,
      longitude,
    };
    if (canSave) {
      await updateJournalEntry(noteBody);
    } else if (!validLocation) {
      alert('Invalid latitude/longitude');
    } else {
      alert('Please ensure all fields are entered');
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteJournalEntry({
      id: journalEntry.id,
    });
  };

  const canSave = [title, journalText, date, userId].every(Boolean) && !isLoading && validLocation;

  const errClass = isError ? 'errmsg' : 'offscreen';

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    );
  });

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='title'>Title:</label>
        <input id='title' name='title' autoComplete='off' type='text' value={title} onChange={handleTitleChange} />
        <label htmlFor='date'>Date:</label>
        <input id='date' name='date' type='date' value={date} onChange={handleDateChange} />
        <label htmlFor='text'>Text:</label>
        <textarea id='journalText' name='journalText' type='text' value={journalText} onChange={handleJournalTextChange} />
        <label htmlFor='user'>User:</label>
        <select id='username' name='username' value={userId} onChange={handleUserIdChange}>
          {options}
        </select>
        <label htmlFor='latitude'>Latitude:</label>
        <input id='latitude' type='number' value={latitude} onChange={handleLatitudeChange} />
        <label htmlFor='longitude'>Longitude:</label>
        <input id='longitude' type='number' value={longitude} onChange={handleLongitudeChange} />
        <Button primary rounded onClick={handleFormSubmit}>
          Save Entry
        </Button>
        <Button warning rounded onClick={handleDeleteClick}>
          Delete Entry
        </Button>
      </form>
    </div>
  );
  return content;
};

export default EditJournalEntryForm;

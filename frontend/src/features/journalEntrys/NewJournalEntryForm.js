import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewJournalEntryMutation } from '../journalEntrys/journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';

const NewJournalEntryForm = ({ users }) => {
  const [addNewJournalEntry, { isLoading, isSuccess, isError, error }] = useAddNewJournalEntryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(users[0].id);
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [validLocation, setValidLocation] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setJournalText('');
      setDate('');
      setUserId(users[0].id);
      navigate('/journalEntrys');
    }
  }, [isSuccess, navigate]);

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
      title,
      journalText,
      date,
      user: userId,
      latitude,
      longitude,
    };

    console.log(canSave, validLocation, latitude, longitude);

    if (canSave) {
      await addNewJournalEntry(noteBody);
    } else if (!validLocation) {
      alert('Invalid latitude/longitude');
    } else {
      alert('Please ensure all fields are entered');
    }
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
      </form>
    </div>
  );

  return content;
};

export default NewJournalEntryForm;

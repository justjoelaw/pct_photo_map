import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewJournalEntryMutation } from '../journalEntrys/journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';

const NewJournalEntryForm = ({ users, trails }) => {
  const [addNewJournalEntry, { isLoading, isSuccess, isError, error }] = useAddNewJournalEntryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(users[0].id);
  const [trailId, setTrailId] = useState(trails[0].id);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [validLocation, setValidLocation] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

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

  const handleTrailIdChange = (e) => {
    setTrailId(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleIsPublicChange = (e) => {
    setIsPublic(!isPublic);
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
      trail: trailId,
      isPublic,
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

  const canSave = [title, journalText, date, userId, trailId].every(Boolean) && !isLoading && validLocation;

  const errClass = isError ? 'errmsg' : 'offscreen';

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    );
  });

  const trailOptions = trails.map((trail) => {
    return (
      <option key={trail.id} value={trail.id}>
        {' '}
        {trail.name}
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
          {userOptions}
        </select>
        <label htmlFor='trail'>Trail:</label>
        <select id='trail' name='trail' value={trailId} onChange={handleTrailIdChange}>
          {trailOptions}
        </select>
        <label htmlFor='latitude'>Latitude:</label>
        <input id='latitude' type='number' value={latitude} onChange={handleLatitudeChange} />
        <label htmlFor='longitude'>Longitude:</label>
        <input id='longitude' type='number' value={longitude} onChange={handleLongitudeChange} />
        <label htmlFor='isPublic'>Public:</label>
        <input id='isPublic' name='isPublic' type='checkbox' value={isPublic} onChange={handleIsPublicChange} />
        <Button primary rounded onClick={handleFormSubmit}>
          Save Entry
        </Button>
      </form>
    </div>
  );

  return content;
};

export default NewJournalEntryForm;

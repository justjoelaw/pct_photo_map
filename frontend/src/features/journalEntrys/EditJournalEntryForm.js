import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateJournalEntryMutation, useDeleteJournalEntryMutation } from './journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';
import useAuth from '../../hooks/useAuth';

const EditJournalEntryForm = ({ users, trails, journalEntry }) => {
  const [updateJournalEntry, { isLoading, isSuccess, isError, error }] = useUpdateJournalEntryMutation();
  const [deleteJournalEntry, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteJournalEntryMutation();

  const navigate = useNavigate();

  const { userId: activeUserId, isAdmin } = useAuth();

  const [title, setTitle] = useState(journalEntry.title);
  const [date, setDate] = useState(journalEntry.date.substring(0, 10));
  const [journalText, setJournalText] = useState(journalEntry.journalText);
  const [userId, setUserId] = useState(isAdmin ? journalEntry.user : activeUserId);
  const [trailId, setTrailId] = useState(journalEntry.trail);
  const [latitude, setLatitude] = useState(journalEntry.latitude || 0);
  const [longitude, setLongitude] = useState(journalEntry.longitude || 0);
  const [validLocation, setValidLocation] = useState(true);
  const [isPublic, setIsPublic] = useState(journalEntry.isPublic);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setJournalText('');
      setDate('');
      setUserId(users[0].id);
      if (isAdmin) {
        navigate('/journalEntrys');
      } else {
        navigate('/home');
      }
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
      id: journalEntry.id,
      title,
      journalText,
      date,
      user: userId,
      latitude,
      longitude,
      trail: trailId,
      isPublic,
    };

    if (!isAdmin) {
      // Prevent non-admin from adding entry for another user
      noteBody.user = activeUserId;
    }

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
        {isAdmin && (
          <>
            <label htmlFor='user'>User:</label>
            <select id='username' name='username' value={userId} onChange={handleUserIdChange}>
              {userOptions}
            </select>
          </>
        )}

        <label htmlFor='trail'>Trail:</label>
        <select id='trail' name='trail' value={trailId} onChange={handleTrailIdChange}>
          {trailOptions}
        </select>
        <label htmlFor='latitude'>Latitude:</label>
        <input id='latitude' type='number' value={latitude} onChange={handleLatitudeChange} />
        <label htmlFor='longitude'>Longitude:</label>
        <input id='longitude' type='number' value={longitude} onChange={handleLongitudeChange} />
        <label htmlFor='isPublic'>Public:</label>
        <input id='isPublic' name='isPublic' type='checkbox' checked={isPublic} value={isPublic} onChange={handleIsPublicChange} />
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

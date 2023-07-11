import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateJournalEntryMutation, useDeleteJournalEntryMutation } from './journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';
import useAuth from '../../hooks/useAuth';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Input from '../../components/Input';
import Label from '../../components/Label';

const EditJournalEntryForm = ({ users, trails, journalEntry }) => {
  const [updateJournalEntry, { isLoading, isSuccess, isError, error }] = useUpdateJournalEntryMutation();
  const [deleteJournalEntry, { isSuccess: isDelSuccess }] = useDeleteJournalEntryMutation();

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
  }, [isSuccess, isDelSuccess, navigate, isAdmin, users]);

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
    <FlexContainer className='grow'>
      <p className={errClass}>{error?.data?.message}</p>
      <FlexContainer primary className='items-left my-5 grow'>
        <form onSubmit={handleFormSubmit}>
          <FlexContainer className='h-full space-y-5'>
            <FlexContainerRow>
              <Label normal htmlFor='title'>
                Title:
              </Label>
              <Input id='title' name='title' autoComplete='off' type='text' className='textInput' value={title} onChange={handleTitleChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label normal htmlFor='date'>
                Date:
              </Label>
              <Input id='date' name='date' type='date' className='textInput' value={date} onChange={handleDateChange} />
            </FlexContainerRow>

            {isAdmin && (
              <FlexContainerRow>
                <Label normal htmlFor='user'>
                  User:
                </Label>
                <select id='username' name='username' value={userId} onChange={handleUserIdChange}>
                  {userOptions}
                </select>
              </FlexContainerRow>
            )}
            <FlexContainerRow>
              <Label normal htmlFor='trail'>
                Trail:
              </Label>
              <select id='trail' name='trail' className='rounded-lg border-2 border-slate-600' value={trailId} onChange={handleTrailIdChange}>
                {trailOptions}
              </select>
            </FlexContainerRow>
            <FlexContainerRow>
              <Label normal htmlFor='latitude'>
                Latitude:
              </Label>
              <Input id='latitude' type='number' className='textInput' value={latitude} onChange={handleLatitudeChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label normal htmlFor='longitude'>
                Longitude:
              </Label>
              <Input id='longitude' type='number' className='textInput' value={longitude} onChange={handleLongitudeChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label normal htmlFor='isPublic'>
                Public:
              </Label>
              <Input id='isPublic' name='isPublic' type='checkbox' checked={isPublic} value={isPublic} onChange={handleIsPublicChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label normal htmlFor='text'>
                Text:
              </Label>
              <FlexContainer className='grow'>
                <textarea
                  id='journalText'
                  name='journalText'
                  type='text'
                  rows='10'
                  className='p-2.5 rounded-lg border-2 border-slate-600'
                  value={journalText}
                  onChange={handleJournalTextChange}
                />
              </FlexContainer>
            </FlexContainerRow>
            <FlexContainerRow>
              <Button primary rounded onClick={handleFormSubmit}>
                Save Entry
              </Button>
              <Button warning rounded onClick={handleDeleteClick}>
                Delete Entry
              </Button>
            </FlexContainerRow>
          </FlexContainer>
        </form>
      </FlexContainer>
    </FlexContainer>
  );
  return content;
};

export default EditJournalEntryForm;

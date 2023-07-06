import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewJournalEntryMutation } from '../journalEntrys/journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';
import { verifyLocation } from './utils/journalEntryUtils';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectActiveTrailId } from '../home/homeSlice';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Input from '../../components/Input';
import Label from '../../components/Label';

const NewJournalEntryForm = ({ users, trails }) => {
  const [addNewJournalEntry, { isLoading, isSuccess, isError, error }] = useAddNewJournalEntryMutation();

  const { userId: activeUserId, isAdmin } = useAuth();
  const activeTrailId = useSelector(selectActiveTrailId);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(activeUserId ?? users[0].id);
  const [trailId, setTrailId] = useState(activeTrailId ?? trails[0].id);
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
      if (isAdmin) {
        navigate('/journalEntrys');
      } else {
        navigate('/home');
      }
    }
  }, [isSuccess, navigate, isAdmin, users]);

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

    if (!isAdmin) {
      // Prevent non-admin from adding entry for another user
      noteBody.user = activeUserId;
    }

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
    <FlexContainer className='grow'>
      <p className={errClass}>{error?.data?.message}</p>

      <FlexContainer primary className='items-left my-5 grow'>
        <form onSubmit={handleFormSubmit} className='h-full'>
          <FlexContainer className='h-full space-y-5'>
            <FlexContainerRow>
              <Label htmlFor='title'>Title:</Label>
              <Input id='title' name='title' autoComplete='off' type='text' className='textInput' value={title} onChange={handleTitleChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label htmlFor='date'>Date:</Label>
              <Input id='date' name='date' type='date' value={date} onChange={handleDateChange} />
            </FlexContainerRow>

            {isAdmin && (
              <FlexContainerRow>
                <Label htmlFor='user'>User:</Label>
                <select id='username' name='username' className='rounded-lg border-2 border-slate-600' value={userId} onChange={handleUserIdChange}>
                  {userOptions}
                </select>
              </FlexContainerRow>
            )}
            <FlexContainerRow>
              <Label htmlFor='trail'>Trail:</Label>
              <select id='trail' name='trail' className='rounded-lg border-2 border-slate-600' value={trailId} onChange={handleTrailIdChange}>
                {trailOptions}
              </select>
            </FlexContainerRow>
            <FlexContainerRow>
              <Label htmlFor='latitude'>Latitude:</Label>
              <Input id='latitude' type='number' className='textInput' value={latitude} onChange={handleLatitudeChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label htmlFor='longitude'>Longitude:</Label>
              <Input id='longitude' type='number' className='textInput' value={longitude} onChange={handleLongitudeChange} />
            </FlexContainerRow>
            <FlexContainerRow>
              <Label htmlFor='isPublic'>Public:</Label>
              <input id='isPublic' name='isPublic' type='checkbox' value={isPublic} onChange={handleIsPublicChange} />
            </FlexContainerRow>
            <FlexContainer className='h-full grow'>
              <FlexContainerRow>
                <Label htmlFor='text'>Text:</Label>
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
            </FlexContainer>
            <FlexContainerRow>
              <Button primary rounded onClick={handleFormSubmit}>
                Save Entry
              </Button>
            </FlexContainerRow>
          </FlexContainer>
        </form>
      </FlexContainer>
    </FlexContainer>
  );

  return content;
};

export default NewJournalEntryForm;

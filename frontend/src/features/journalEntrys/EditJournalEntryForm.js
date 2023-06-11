import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateJournalEntryMutation, useDeleteJournalEntryMutation } from './journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';

const EditJournalEntryForm = ({ users, journalEntry }) => {
  const [updateJournalEntry, { isLoading, isSuccess, isError, error }] = useUpdateJournalEntryMutation();
  const [deleteJournalEntry, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteJournalEntryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(journalEntry.title);
  const [date, setDate] = useState(journalEntry.date.substring(0, 10));
  const [journalText, setJournalText] = useState(journalEntry.journalText);
  const [userId, setUserId] = useState(journalEntry.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setJournalText('');
      setDate('');
      setUserId(users[0].id);
      navigate('/journalEntrys');
    }
  }, [isSuccess, isDelSuccess, navigate]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const noteBody = {
      id: journalEntry.id,
      title,
      journalText,
      date,
      user: userId,
    };
    if (canSave) {
      await updateJournalEntry(noteBody);
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

  const canSave = [title, journalText, date, userId].every(Boolean) && !isLoading;

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
        <Button primary rounded onClick={handleFormSubmit}>
          Save Entry
        </Button>
        <Button warning rounded onClick={handleDeleteClick}>
          Delete User
        </Button>
      </form>
    </div>
  );
  return content;
};

export default EditJournalEntryForm;

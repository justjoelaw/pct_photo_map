import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewJournalEntryMutation } from '../journalEntrys/journalEntrysApiSlice';
import { useNavigate } from 'react-router-dom';

const NewJournalEntryForm = ({ users }) => {
  const [addNewJournalEntry, { isLoading, isSuccess, isError, error }] = useAddNewJournalEntryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setJournalText('');
      setDate('');
      setUserId(users[0].id);
      navigate('/journalEntrys');
    }
  }, [isSuccess, navigate]);

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
      title,
      journalText,
      date,
      user: userId,
    };
    if (canSave) {
      await addNewJournalEntry(noteBody);
    } else {
      alert('Please ensure all fields are entered');
    }
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
      </form>
    </div>
  );

  return content;
};

export default NewJournalEntryForm;

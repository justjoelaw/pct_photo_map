import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import NewJournalEntryForm from './NewJournalEntryForm';

const NewJournalEntry = () => {
  const users = useSelector(selectAllUsers);

  const content = users ? <NewJournalEntryForm users={users} /> : <p>Loading...</p>;

  return content;
};
export default NewJournalEntry;

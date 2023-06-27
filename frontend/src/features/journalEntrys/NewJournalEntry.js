import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import { selectAllTrails } from '../trails/trailsApiSlice';
import NewJournalEntryForm from './NewJournalEntryForm';

const NewJournalEntry = () => {
  const users = useSelector(selectAllUsers);
  const trails = useSelector(selectAllTrails);

  const content = users && trails ? <NewJournalEntryForm users={users} trails={trails} /> : <p>Loading...</p>;

  return content;
};
export default NewJournalEntry;

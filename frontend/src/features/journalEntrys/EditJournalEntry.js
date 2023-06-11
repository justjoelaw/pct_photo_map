import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectJournalEntryById } from './journalEntrysApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditJournalEntryForm from './EditJournalEntryForm';

const EditJournalEntry = () => {
  const { id } = useParams();

  const users = useSelector(selectAllUsers);

  const journalEntry = useSelector((state) => selectJournalEntryById(state, id));

  const content = journalEntry ? <EditJournalEntryForm users={users} journalEntry={journalEntry} /> : <p>Loading...</p>;

  return content;
};
export default EditJournalEntry;

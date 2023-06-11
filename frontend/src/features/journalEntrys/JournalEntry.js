import { useSelector } from 'react-redux';
import { selectJournalEntryById } from './journalEntrysApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const JournalEntry = ({ journalEntryId }) => {
  const journalEntry = useSelector((state) => selectJournalEntryById(state, journalEntryId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/journalEntrys/${journalEntryId}/edit`);
  };

  const content = (
    <tr>
      <td>{journalEntry.title}</td>
      <td>{journalEntry.date}</td>
      <td>{journalEntry.user}</td>
      <td>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </td>
    </tr>
  );
  return content;
};

export default JournalEntry;

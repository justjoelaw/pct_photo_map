import { useSelector } from 'react-redux';
import { selectJournalEntryById } from './journalEntrysApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';

const JournalEntry = ({ journalEntryId }) => {
  const journalEntry = useSelector((state) => selectJournalEntryById(state, journalEntryId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/journalEntrys/${journalEntryId}/edit`);
  };

  const content = (
    <TableRow>
      <TableData>{journalEntry.title}</TableData>
      <TableData>{journalEntry.date}</TableData>
      <TableData>{journalEntry.user}</TableData>
      <TableData>{journalEntry.latitude}</TableData>
      <TableData>{journalEntry.longitude}</TableData>
      <TableData>{journalEntry.trail}</TableData>
      <TableData>{journalEntry.isPublic ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</TableData>
      <TableData>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </TableData>
    </TableRow>
  );
  return content;
};

export default JournalEntry;

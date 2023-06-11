import JournalEntrysList from './JournalEntrysList';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const JournalEntrysPage = () => {
  const navigate = useNavigate();

  const handleNewJournalEntry = () => {
    navigate('/journalEntrys/new');
  };

  const content = (
    <div>
      <Button primary rounded onClick={handleNewJournalEntry}>
        New JournalEntry
      </Button>
      <JournalEntrysList />
    </div>
  );

  return content;
};

export default JournalEntrysPage;

import TrailsList from './TrailsList';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const TrailsPage = () => {
  const navigate = useNavigate();

  const handleNewTrail = () => {
    navigate('/trails/new');
  };

  const content = (
    <div>
      <Button primary rounded onClick={handleNewTrail}>
        New Trail
      </Button>
      <TrailsList />
    </div>
  );

  return content;
};

export default TrailsPage;

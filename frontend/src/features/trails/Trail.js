import { useSelector } from 'react-redux';
import { selectTrailById } from './trailsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Trail = ({ trailId }) => {
  const trail = useSelector((state) => selectTrailById(state, trailId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/trails/${trailId}/edit`);
  };

  const content = (
    <tr>
      <td>{trail.name}</td>
      <td>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </td>
    </tr>
  );
  return content;
};

export default Trail;

import { useSelector } from 'react-redux';
import { selectTrailById } from './trailsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';

const Trail = ({ trailId }) => {
  const trail = useSelector((state) => selectTrailById(state, trailId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/trails/${trailId}/edit`);
  };

  const content = (
    <TableRow>
      <TableData>{trail.name}</TableData>
      <TableData>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </TableData>
    </TableRow>
  );
  return content;
};

export default Trail;

import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/users/${userId}/edit`);
  };

  const content = (
    <TableRow>
      <TableData>{user.id}</TableData>
      <TableData>{user.username}</TableData>
      <TableData>{user.isAdmin ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</TableData>
      <TableData>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </TableData>
    </TableRow>
  );
  return content;
};

export default User;

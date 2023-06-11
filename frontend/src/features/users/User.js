import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/users/${userId}/edit`);
  };

  const content = (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.isAdmin ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</td>
      <td>
        <Button primary onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </td>
    </tr>
  );
  return content;
};

export default User;

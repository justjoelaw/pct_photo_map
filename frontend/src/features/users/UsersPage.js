import UsersList from './UsersList';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();

  const handleNewUser = () => {
    navigate('/users/new');
  };

  const content = (
    <div>
      <Button primary rounded onClick={handleNewUser}>
        New User
      </Button>
      <UsersList />
    </div>
  );

  return content;
};

export default UsersPage;

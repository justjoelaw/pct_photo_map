import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('');
      setPassword('');
      setIsAdmin(false);
      navigate('/users');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleisAdminChange = (e) => {
    setIsAdmin((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (password) {
        await updateUser({ id: user.id, username, password, isAdmin });
      } else {
        await updateUser({ id: user.id, username, isAdmin });
      }
    } else {
      if (!validUsername) {
        alert('Cannot update user - username invalid');
      } else if (!validPassword) {
        alert('Cannot update user - invalid password');
      }
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteUser({
      id: user.id,
    });
  };

  let canSave;
  if (password) {
    canSave = [validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, validPassword].every(Boolean) && !isLoading;
  }

  const errClass = isError ? 'errmsg' : 'offscreen';

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='username'>
          Username: <span className='nowrap'>[3-20 letters]</span>
        </label>
        <input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} />
        <label htmlFor='password'>
          Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input id='password' name='password' autoComplete='off' type='password' value={password} onChange={handlePasswordChange} />
        <label htmlFor='isAdmin'>Admin:</label>
        <input id='isAdmin' name='isAdmin' type='checkbox' checked={isAdmin} value={isAdmin} onChange={handleisAdminChange} />
        <Button primary rounded onClick={handleFormSubmit} disabled={!canSave}>
          Save User
        </Button>
        <Button warning rounded onClick={handleDeleteClick}>
          Delete User
        </Button>
      </form>
    </div>
  );

  return content;
};

export default EditUserForm;

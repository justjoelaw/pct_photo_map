import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setIsAdmin(false);
      navigate('/users');
    }
  }, [isSuccess, navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleisAdminChange = (e) => {
    setIsAdmin(!isAdmin);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userBody = {
      username,
      password,
      isAdmin,
    };
    if (canSave) {
      await addNewUser(userBody);
    } else {
      if (!validUsername) {
        alert('Cannot create user - invalid username');
      } else if (!validPassword) {
        alert('Cannot create user - invalid password');
      }
    }
  };

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

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
        <input id='isAdmin' name='isAdmin' type='checkbox' value={isAdmin} onChange={handleisAdminChange} />
        <Button primary rounded onClick={handleFormSubmit}>
          Save User
        </Button>
      </form>
    </div>
  );

  return content;
};

export default NewUserForm;

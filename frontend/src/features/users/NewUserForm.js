import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();
  const { isAdmin: activeUserIsAdmin } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setIsAdmin(false);

      if (activeUserIsAdmin) {
        navigate('/users');
      } else {
        navigate('/postRegistration');
      }
    }
  }, [isSuccess, navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
      email,
      password,
      isAdmin: activeUserIsAdmin ? isAdmin : false, //Prevent non-admin setting account as admin
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

  const canSave = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading;

  const errClass = isError ? 'errmsg' : 'offscreen';

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='username'>
          Username: <span className='nowrap'>[3-20 letters]</span>
        </label>
        <input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} />
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' autoComplete='off' type='text' value={email} onChange={handleEmailChange} />
        <label htmlFor='password'>
          Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input id='password' name='password' autoComplete='off' type='password' value={password} onChange={handlePasswordChange} />
        {activeUserIsAdmin && (
          <>
            <label htmlFor='isAdmin'>Admin:</label>
            <input id='isAdmin' name='isAdmin' type='checkbox' value={isAdmin} onChange={handleisAdminChange} />
          </>
        )}
        <Button primary rounded onClick={handleFormSubmit}>
          Register
        </Button>
      </form>
    </div>
  );

  return content;
};

export default NewUserForm;

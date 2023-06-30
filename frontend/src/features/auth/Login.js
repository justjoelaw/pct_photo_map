import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import Button from '../../components/Button';
import usePersist from '../../hooks/usePersist';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');

      const decoded = jwt_decode(accessToken);
      const { isAdmin } = decoded.UserInfo;
      if (isAdmin) {
        navigate('/');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        alert(err.data.message);
      }
      console.log(err);
    }
  };

  const handlePersistChange = () => {
    setPersist((prev) => !prev);
  };

  const content = (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor='username'>Username:</label>
      <input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' autoComplete='off' type='password' value={password} onChange={handlePasswordChange} />
      <Button primary rounded onClick={handleFormSubmit}>
        Login
      </Button>
      <label htmlFor='persist'>Trust this device?</label>
      <input id='persist' type='checkbox' checked={persist} onChange={handlePersistChange} />
    </form>
  );

  return content;
};

export default Login;

import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import Button from '../../components/Button';
import usePersist from '../../hooks/usePersist';
import jwt_decode from 'jwt-decode';
import FlexContainer from '../../components/FlexContainer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import FlexContainerRow from '../../components/FlexContainerRow';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();

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
    <FlexContainer className='grow'>
      <Header splash className='basis-1/4 text-center'>
        Trail Journal
      </Header>
      <div className='basis-3/4'>
        <FlexContainer primary className='items-center'>
          <div>
            <form onSubmit={handleFormSubmit}>
              <FlexContainer className='space-y-5'>
                <FlexContainerRow>
                  <label htmlFor='username' className='w-40'>
                    Username:
                  </label>
                  <Input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} textInput />
                </FlexContainerRow>
                <FlexContainerRow>
                  <label htmlFor='password' className='w-40'>
                    Password:
                  </label>
                  <Input
                    id='password'
                    name='password'
                    autoComplete='off'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    textInput
                  />
                </FlexContainerRow>

                <FlexContainer className='items-center'>
                  <Button primary rounded onClick={handleFormSubmit}>
                    Login
                  </Button>
                  <FlexContainerRow>
                    <label htmlFor='persist'>Trust this device?</label>
                    <input id='persist' type='checkbox' checked={persist} onChange={handlePersistChange} />
                  </FlexContainerRow>
                </FlexContainer>
              </FlexContainer>
            </form>
          </div>
        </FlexContainer>
      </div>
    </FlexContainer>
  );

  return content;
};

export default Login;

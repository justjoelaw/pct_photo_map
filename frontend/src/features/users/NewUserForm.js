import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useAddNewUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Header from '../../components/Header';
import Label from '../../components/Label';

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

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
  }, [isSuccess, navigate, activeUserIsAdmin]);

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
    <FlexContainer className='grow'>
      <Header splash className='basis-1/4 text-center'>
        Trail Journal
      </Header>
      <div className='basis-3/4'>
        <p className={errClass}>{error?.data?.message}</p>
        <FlexContainer primary className='items-center'>
          <div>
            <form onSubmit={handleFormSubmit}>
              <FlexContainer className='space-y-5'>
                <FlexContainerRow>
                  <Label normal htmlFor='username' className='w-80'>
                    Username: <span className='nowrap'>[3-20 letters]</span>
                  </Label>
                  <input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} />
                </FlexContainerRow>
                <FlexContainerRow>
                  <Label normal htmlFor='email' className='w-80'>
                    Email:
                  </Label>
                  <input id='email' name='email' autoComplete='nope' type='email' value={email} onChange={handleEmailChange} />
                </FlexContainerRow>
                <FlexContainerRow>
                  <Label normal htmlFor='password' className='w-80'>
                    Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
                  </Label>
                  <input id='password' name='password' autoComplete='off' type='password' value={password} onChange={handlePasswordChange} />
                </FlexContainerRow>
                <FlexContainerRow>
                  {activeUserIsAdmin && (
                    <>
                      <Label normal htmlFor='isAdmin'>
                        Admin:
                      </Label>
                      <input id='isAdmin' name='isAdmin' type='checkbox' value={isAdmin} onChange={handleisAdminChange} />
                    </>
                  )}
                </FlexContainerRow>
                <FlexContainer className='items-center'>
                  <Button primary rounded onClick={handleFormSubmit}>
                    Register
                  </Button>
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

export default NewUserForm;

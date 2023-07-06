import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Label from '../../components/Label';
import Input from '../../components/Input';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
        await updateUser({ id: user.id, email, username, password, isAdmin });
      } else {
        await updateUser({ id: user.id, email, username, isAdmin });
      }
    } else {
      if (!validUsername) {
        alert('Cannot update user - username invalid');
      } else if (!validPassword) {
        alert('Cannot update user - invalid password');
      } else if (!validEmail) {
        alert('Cannot update user - invalid email');
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
    canSave = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, validEmail].every(Boolean) && !isLoading;
  }

  const errClass = isError ? 'errmsg' : 'offscreen';

  const content = (
    <FlexContainer primary>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <FlexContainer>
          <FlexContainerRow>
            <Label htmlFor='username'>
              Username: <span className='nowrap'>[3-20 letters]</span>
            </Label>
            <Input id='username' name='username' autoComplete='off' type='text' value={username} onChange={handleUsernameChange} />
          </FlexContainerRow>
          <FlexContainerRow>
            <Label htmlFor='email' className='w-80'>
              Email:
            </Label>
            <Input id='email' name='email' autoComplete='off' type='text' className='textInput' value={email} onChange={handleEmailChange} />
          </FlexContainerRow>

          <FlexContainerRow>
            <Label htmlFor='password'>
              Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
            </Label>
            <Input id='password' name='password' autoComplete='off' type='password' value={password} onChange={handlePasswordChange} />
          </FlexContainerRow>
          <FlexContainerRow>
            <Label htmlFor='isAdmin'>Admin:</Label>
            <Input id='isAdmin' name='isAdmin' type='checkbox' checked={isAdmin} value={isAdmin} onChange={handleisAdminChange} />
          </FlexContainerRow>
          <FlexContainerRow>
            <Button primary rounded onClick={handleFormSubmit} disabled={!canSave}>
              Save User
            </Button>
            <Button warning rounded onClick={handleDeleteClick}>
              Delete User
            </Button>
          </FlexContainerRow>
        </FlexContainer>
      </form>
    </FlexContainer>
  );

  return content;
};

export default EditUserForm;

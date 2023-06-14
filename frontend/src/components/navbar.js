import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button.js';
import { useEffect } from 'react';
import { store } from '../app/store.js';

import { useSendLogoutMutation } from '../features/auth/authApiSlice.js';
import { selectCurrentToken } from '../features/auth/authSlice.js';

// Here, we display our Navbar
const Navbar = () => {
  const navigate = useNavigate();
  const onGoHomeClicked = () => navigate('/');

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  const logoutButton = (
    <Button primary rounded onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  );

  const loginButton = (
    <Button primary rounded>
      <Link to='/login'>Login</Link>
    </Button>
  );

  const accessToken = selectCurrentToken(store.getState());

  return (
    <nav className='bg-gray-300 h-20'>
      <div>
        <FontAwesomeIcon icon={faHouse} size='lg' style={{ color: '#ee9c3f' }} onClick={onGoHomeClicked} />
        {accessToken ? logoutButton : loginButton}
      </div>
    </nav>
  );
};

export default Navbar;

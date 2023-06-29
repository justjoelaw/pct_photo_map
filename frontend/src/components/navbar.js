import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button.js';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';

import { useSendLogoutMutation } from '../features/auth/authApiSlice.js';
import { selectCurrentToken } from '../features/auth/authSlice.js';

import { useSelector } from 'react-redux';

// Here, we display our Navbar
const Navbar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const { username, isAdmin } = useAuth();

  const navigate = useNavigate();
  const onGoHomeClicked = () => navigate('/');

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  const accessToken = useSelector(selectCurrentToken);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (accessToken) {
      console.log('Setting userLoggedIn=true');
      setUserLoggedIn(true);
    } else {
      console.log('Setting userLoggedIn=true');
      setUserLoggedIn(false);
    }
  }, [accessToken]);

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

  return (
    <nav className='bg-gray-300 h-30'>
      <div>
        <FontAwesomeIcon icon={faHouse} size='lg' style={{ color: '#ee9c3f' }} onClick={onGoHomeClicked} />
        {userLoggedIn ? logoutButton : loginButton}
        {userLoggedIn ? <div>Logged in as: {username}</div> : <div></div>}
        {isAdmin ? <div> Admin Mode</div> : <div></div>}
      </div>
    </nav>
  );
};

export default Navbar;

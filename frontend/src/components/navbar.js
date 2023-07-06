import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.js';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';

import { useSendLogoutMutation } from '../features/auth/authApiSlice.js';

import { useSelector } from 'react-redux';

import FlexContainerRow from './FlexContainerRow';
import { selectUserLoggedIn } from '../features/auth/authSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Header from './Header.js';

// Here, we display our Navbar
const Navbar = ({ className }) => {
  let content;
  const userLoggedIn = useSelector(selectUserLoggedIn);

  const { username, isAdmin } = useAuth();

  const navigate = useNavigate();
  const onGoHomeClicked = () => {
    if (isAdmin) {
      navigate('/');
    } else {
      navigate('/home');
    }
  };

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  const logoutButton = (
    <Button primary rounded className='mx-1' onClick={sendLogout}>
      <FontAwesomeIcon icon={icon({ name: 'right-from-bracket', style: 'solid' })} />
    </Button>
  );

  // const loginButton = (
  //   <Button primary rounded>
  //     <Link to='/login'>Login</Link>
  //   </Button>
  // );

  // const registerButton = (
  //   <Button primary rounded>
  //     <Link to='/register'>Register</Link>
  //   </Button>
  // );

  if (userLoggedIn) {
    content = (
      <div className={className}>
        <nav className='bg-slate-200 bg-opacity-80'>
          <div>
            <FlexContainerRow>
              <Header navbar className='mx-1'>
                Trail Journal
              </Header>
              <Button primary rounded className='mx-1' onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={icon({ name: 'house', style: 'solid' })} />
              </Button>

              {logoutButton}
              {/* {userLoggedIn ? logoutButton : loginButton} */}
              {/* {!userLoggedIn && registerButton} */}
              {userLoggedIn ? <div>Logged in as: {username}</div> : <div></div>}
              {isAdmin ? <div> Admin Mode</div> : <div></div>}
            </FlexContainerRow>
          </div>
        </nav>
      </div>
    );
  } else {
    content = <></>;
  }

  return content;
};

export default Navbar;

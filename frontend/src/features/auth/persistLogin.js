import { useSelector } from 'react-redux';
import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';
import { useRef, useState, useEffect } from 'react';
import { useRefreshMutation } from './authApiSlice';
import { Outlet, Link } from 'react-router-dom';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // Accounting for strict-mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, [persist, refresh, token]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p>
        {error.data?.message}
        <Link to='/login'>Try logging in again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;

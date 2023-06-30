import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useVerifyEmailMutation } from './authApiSlice';

const VerifyEmail = () => {
  const [content, setContent] = useState(<div>Attempting to verify email...</div>);

  const [searchParams] = useSearchParams();
  const { isVerified } = useAuth();
  const navigate = useNavigate();
  const emailToken = searchParams.get('emailToken');
  console.log('isVerified is ', isVerified);

  const [verifyEmail, { isLoading, isSuccess, isError, error }] = useVerifyEmailMutation();

  useEffect(() => {
    if (isVerified) {
      navigate('/home');
    }
  }, [isVerified, navigate]);

  useEffect(() => {
    const verifyEmailAsync = async () => {
      const result = await verifyEmail({ emailToken }).unwrap();
      return result;
    };

    if (!isVerified) {
      const result = verifyEmailAsync();
      console.log(result);
      if (result.error) {
        setContent(<div>Email verification failed</div>);
      } else {
        setContent(<div>Thank you - your email is now verified</div>);
      }
    }
  }, [emailToken]);

  return content;
};

export default VerifyEmail;

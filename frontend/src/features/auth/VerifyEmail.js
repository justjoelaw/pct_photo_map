import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useVerifyEmailMutation } from './authApiSlice';
import Header from '../../components/Header';
import FlexContainer from '../../components/FlexContainer';

const VerifyEmail = () => {
  const [message, setMessage] = useState(<div>Attempting to verify email...</div>);

  const [searchParams] = useSearchParams();
  const { isVerified } = useAuth();
  const navigate = useNavigate();
  const emailToken = searchParams.get('emailToken');
  console.log('isVerified is ', isVerified);

  const [verifyEmail] = useVerifyEmailMutation();

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
        setMessage(<div>Email verification failed</div>);
      } else {
        setMessage(<div>Thank you - your email is now verified</div>);
      }
    }
  }, [emailToken, isVerified, verifyEmail]);

  let content;

  content = (
    <FlexContainer className='grow'>
      <Header splash className='basis-1/4 text-center'>
        Trail Journal
      </Header>
      <div className='basis-3/4'>
        <FlexContainer primary className='items-center'>
          {message}
        </FlexContainer>
      </div>
    </FlexContainer>
  );

  return content;
};

export default VerifyEmail;

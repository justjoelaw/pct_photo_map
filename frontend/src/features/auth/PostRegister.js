import React from 'react';
import Header from '../../components/Header';
import FlexContainer from '../../components/FlexContainer';

const PostRegister = () => {
  return (
    <FlexContainer className='grow'>
      <Header splash className='basis-1/4 text-center'>
        Trail Journal
      </Header>
      <div className='basis-3/4'>
        <FlexContainer primary className='items-center'>
          <div>Thank you for registering. Please check your email to verify your account!</div>
        </FlexContainer>
      </div>
    </FlexContainer>
  );
};

export default PostRegister;

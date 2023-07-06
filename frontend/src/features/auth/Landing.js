import { Link } from 'react-router-dom';
import { selectUserLoggedIn } from './authSlice';
import { useSelector } from 'react-redux';
import FlexContainer from '../../components/FlexContainer';
import FlexContainerRow from '../../components/FlexContainerRow';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Landing = () => {
  const userLoggedIn = useSelector(selectUserLoggedIn);
  let content;

  const loginButton = (
    <Link to='/login'>
      <Button primary large rounded>
        <FontAwesomeIcon className='mx-1' icon={icon({ name: 'user', style: 'regular' })} />
        Login
      </Button>
    </Link>
  );

  const registerButton = (
    <Link to='/register'>
      <Button primary large rounded>
        <FontAwesomeIcon className='mx-1' icon={icon({ name: 'pen-to-square', style: 'regular' })} />
        Register
      </Button>
    </Link>
  );

  if (userLoggedIn) {
    content = (
      <FlexContainer primary className='space-y-5 items-center'>
        <Header splashSm>Welcome to the Trail Journal Admin Screen</Header>
        <Button primary rounded>
          <Link to='/users'>View Users</Link>
        </Button>
        <Button primary rounded>
          <Link to='/journalEntrys'>View Journal Entries</Link>
        </Button>
        <Button primary rounded>
          <Link to='/trails'>View Trails</Link>
        </Button>
        <Button primary rounded>
          <Link to='/home'>View Homepage</Link>
        </Button>
      </FlexContainer>
    );
  } else {
    content = (
      <FlexContainer className='h-screen'>
        <Header splash className='basis-1/4 text-center'>
          Trail Journal
        </Header>
        <FlexContainer primary>
          <div>
            <p>Welcome to Trail Journal - the journal app designed for hikers</p>
            <p>Pin your journal entries to a map of the trail, add friends, and share memories</p>
          </div>
          <div className='mt-5'>
            <FlexContainerRow>
              <div className='ml-40 basis-1/2 flex justify-center'>{loginButton}</div>
              <div className='mr-40 basis-1/2 flex justify-center'>{registerButton}</div>
            </FlexContainerRow>
          </div>
        </FlexContainer>
      </FlexContainer>
    );
  }

  return content;
};

export default Landing;

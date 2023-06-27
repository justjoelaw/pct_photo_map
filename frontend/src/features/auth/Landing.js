import { Link } from 'react-router-dom';

const Landing = () => {
  const content = (
    <>
      <h1>Welcome to PCT Journal Map</h1>
      <p>
        <Link to='/users'>View Users</Link>
      </p>
      <p>
        <Link to='/journalEntrys'>View Journal Entries</Link>
      </p>
      <p>
        <Link to='/trails'>View Trails</Link>
      </p>
    </>
  );

  return content;
};

export default Landing;

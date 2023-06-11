import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Here, we display our Navbar
const Navbar = () => {
  const navigate = useNavigate();
  const onGoHomeClicked = () => navigate('/');

  return (
    <nav className='bg-gray-300 h-20'>
      <div>
        <FontAwesomeIcon icon={faHouse} size='lg' style={{ color: '#ee9c3f' }} onClick={onGoHomeClicked} />
      </div>
    </nav>
  );
};

export default Navbar;

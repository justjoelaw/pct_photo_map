import Button from '../../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddEntryButton = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/journalEntrys/new');
  };

  return (
    <Button rounded primary className={className} onClick={handleClick}>
      Add Entry
    </Button>
  );
};

export default AddEntryButton;

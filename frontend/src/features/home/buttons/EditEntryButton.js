import Button from '../../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditEntryButton = ({ entryId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/journalEntrys/${entryId}/edit`);
  };

  return (
    <Button rounded primary onClick={handleClick}>
      Edit Entry
    </Button>
  );
};

export default EditEntryButton;

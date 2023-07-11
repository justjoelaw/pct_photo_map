import { useState, useEffect } from 'react';
import { useUpdateTrailMutation, useDeleteTrailMutation } from './trailsApiSlice';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Label from '../../components/Label';

const NAME_REGEX = /^[A-z\s\-:]{3,100}$/;

const EditTrailForm = ({ trail }) => {
  const [updateTrail, { isLoading, isSuccess, isError, error }] = useUpdateTrailMutation();
  const [deleteTrail, { isSuccess: isDelSuccess }] = useDeleteTrailMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(trail.name);
  const [validName, setValidName] = useState(false);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      console.log('isSuccess');
      setName('');
      navigate('/trails');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const trailBody = {
      id: trail.id,
      name,
    };
    if (canSave) {
      await updateTrail(trailBody);
    } else {
      if (!validName) {
        alert('Cannot create trail - invalid name');
      }
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteTrail({
      id: trail.id,
    });
  };

  const canSave = [validName].every(Boolean) && !isLoading;

  const errClass = isError ? 'errmsg' : 'offscreen';

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <Label normal htmlFor='name'>
          Name: <span className='nowrap'>[3-100 letters]</span>
        </Label>
        <input id='name' name='name' autoComplete='off' type='text' value={name} onChange={handleNameChange} />
        <Button primary rounded onClick={handleFormSubmit}>
          Save Trail
        </Button>
        <Button warning rounded onClick={handleDeleteClick}>
          Delete Trail
        </Button>
      </form>
    </div>
  );

  return content;
};
export default EditTrailForm;

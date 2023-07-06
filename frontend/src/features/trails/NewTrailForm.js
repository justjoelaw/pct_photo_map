import { useState, useEffect } from 'react';
import { useAddNewTrailMutation } from './trailsApiSlice';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const NAME_REGEX = /^[A-z\s\-:]{3,100}$/;

const NewTrail = () => {
  const [addNewTrail, { isLoading, isSuccess, isError, error }] = useAddNewTrailMutation();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    if (isSuccess) {
      setName('');
      navigate('/trails');
    }
  }, [isSuccess, navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const trailBody = {
      name,
    };
    if (canSave) {
      await addNewTrail(trailBody);
    } else {
      if (!validName) {
        alert('Cannot create trail - invalid name');
      }
    }
  };

  const canSave = [validName].every(Boolean) && !isLoading;

  const errClass = isError ? 'errmsg' : 'offscreen';

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='name'>
          Name: <span className='nowrap'>[3-100 letters]</span>
        </label>
        <input id='name' name='name' autoComplete='off' type='text' value={name} onChange={handleNameChange} />
        <Button primary rounded onClick={handleFormSubmit}>
          Save Trail
        </Button>
      </form>
    </div>
  );

  return content;
};
export default NewTrail;

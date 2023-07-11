import React from 'react';
import { setActiveTrailId } from './homeSlice';
import { useDispatch } from 'react-redux';
import Label from '../../components/Label';
import FlexContainerRow from '../../components/FlexContainerRow';
import FlexContainer from '../../components/FlexContainer';

const TrailSelector = ({ trails, trailId, setTrailId }) => {
  const dispatch = useDispatch();

  const handleTrailIdChange = (e) => {
    e.preventDefault();
    setTrailId(e.target.value);
    dispatch(setActiveTrailId({ trailId: e.target.value }));
  };

  const trailOptions = trails.map((trail) => {
    return (
      <option key={trail.id} value={trail.id}>
        {' '}
        {trail.name}
      </option>
    );
  });

  const content = (
    <div>
      <div>Which trail would you like to view entries for?</div>
      <form>
        <FlexContainer className='items-center'>
          <FlexContainerRow>
            <Label inline htmlFor='trail'>
              Trail:
            </Label>
            <select id='trail' name='trail' value={trailId} onChange={handleTrailIdChange}>
              {trailOptions}
            </select>
          </FlexContainerRow>
        </FlexContainer>
      </form>
    </div>
  );
  return content;
};

export default TrailSelector;

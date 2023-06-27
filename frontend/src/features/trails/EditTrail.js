import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTrailById } from './trailsApiSlice';
import EditTrailForm from './EditTrailForm';

const EditTrail = () => {
  const { id } = useParams();

  const trail = useSelector((state) => selectTrailById(state, id));

  const content = trail ? <EditTrailForm trail={trail} /> : <p>Loading...</p>;

  return content;
};
export default EditTrail;

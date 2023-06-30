import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwt_decode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isVerified = false;

  if (token) {
    const decoded = jwt_decode(token);
    const { username, isAdmin, userId, isVerified } = decoded.UserInfo;

    return { username, isAdmin, userId, isVerified };
  }

  return { username: '', isAdmin, userId: '', isVerified };
};
export default useAuth;

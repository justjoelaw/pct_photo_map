import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminRequired = () => {
  const { isAdmin } = useAuth();
  console.log(`isAdmin is ${isAdmin}`);

  if (isAdmin) {
    return <Outlet />;
  } else {
    return <div>Admin access only</div>;
  }
};

export default AdminRequired;

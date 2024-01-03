import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    // Add logic to handle user token changes if needed
  }, [user?.token, location]);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default Layout;

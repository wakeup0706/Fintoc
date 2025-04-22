import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from "../store";

const PrivateRoute = () => {
  const { hydrated, authUser } = useAppStore.authStore((state) => ({
    hydrated: state.hydrated,
    authUser: state.authUser,
  }));

  const { getUser } = useAppStore.authStore.getState();

  useEffect(() => {
    if (!hydrated) {
      getUser(); // Try to load user from localStorage
    }
  }, [hydrated, getUser]);

  return hydrated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;

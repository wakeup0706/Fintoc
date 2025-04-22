import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store';

const PrivateRoute = () => {
  const store = useStore();

  useEffect(() => {
    const state = useStore.getState();
    if (!state.hydrated) {
      state.getUser(); // try to load user from localStorage token
    }
  }, []);

  if (!store.hydrated) {
    return null;  // Or a loading spinner until the state is hydrated
  }

  return store.authUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;

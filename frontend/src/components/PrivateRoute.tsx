import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from "../store";

const PrivateRoute = () => {
  const store = useAppStore.authStore();

  useEffect(() => {
    if (!store.hydrated) {
      store.getUser(); // try to load user from localStorage token
    }
  }, []);

  return store.hydrated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;

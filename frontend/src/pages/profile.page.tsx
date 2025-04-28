import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store";
import { FintocWidget } from "../components/Fintoc";

const ProfilePage = () => {
  const { getUser, loginWithToken, authUser } = useAppStore.authStore.getState();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      loginWithToken(token);
    }

    getUser();
  }, [search, getUser]);

  useEffect(() => {
    console.log(authUser);
  })

  return (
    <div>
      <h1>Profile Page</h1>
      <FintocWidget />
    </div>
  );
};

export default ProfilePage;

import { useEffect } from "react";
import { useAppStore } from "../store";

const ProfilePage = () => {
  const { hydrated, authUser } = useAppStore.authStore((state) => ({
    hydrated: state.hydrated,
    authUser: state.authUser,
  }));

  const { getUser } = useAppStore.authStore.getState();

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
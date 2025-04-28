import { useEffect } from "react";
import { useAppStore } from "../store";

const DashboardPage = () => {

  const { getUser } = useAppStore.authStore.getState();

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default DashboardPage;
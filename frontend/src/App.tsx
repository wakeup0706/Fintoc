import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/auth/login.page";
import ProfilePage from "./pages/profile.page";
import Dashboard from "./pages/dashboard.page";
import RegisterPage from "./pages/auth/register.page";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

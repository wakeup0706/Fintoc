import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/auth/login.page";
import ProfilePage from "./pages/profile.page";
import Dashboard from "./pages/dashboard.page";
import RegisterPage from "./pages/auth/register.page";
import PrivateRoute from "./components/PrivateRoute";
import AllowPage from "./pages/auth/allow";
import VerifyPassword from "./pages/auth/verifyPassword";
import ChangePassword from "./pages/auth/changePassword";
import SubscriptionPage from "./pages/subscription";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<VerifyPassword />} />
      <Route path="/reset-password" element={<ChangePassword />} />
      <Route path="/allow" element={<AllowPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subscription" element={<SubscriptionPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/footer/Footer";
import TopSection from "../components/Layout/profile/TopSection";
import EasierSection from "../components/Layout/profile/easierSection/EasierSection";
import FinancialSection from "../components/Layout/profile/financialSection/FinancialSection";
import PricingComparison from "../components/Layout/profile/PricingComparison";
import Imonials from "../components/Layout/profile/imonoals/Imonials";

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
      <Header />
      <TopSection />
      <EasierSection />
      <FinancialSection />
      <PricingComparison />
      <Imonials />
      <h1>Profile Page</h1>
      <Footer />
    </div>
  );
};

export default ProfilePage;

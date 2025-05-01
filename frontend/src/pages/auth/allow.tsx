import Faltan from "../../components/allow_layout/FalTan";
import Footer from "../../components/allow_layout/footer/Footer";
import Gestiona from "../../components/allow_layout/gestiona/Gestiona";
import Header from "../../components/allow_layout/Header";
import TopSection from "../../components/allow_layout/TopSection";

const AllowPage = () => {
 
  return (
    <>
      <Header />
      <TopSection />
      <Gestiona />
      <Faltan />
      <Footer />
    </>
  );
};

export default AllowPage;
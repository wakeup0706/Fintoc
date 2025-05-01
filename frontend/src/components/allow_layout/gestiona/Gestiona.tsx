import List from "./List";
import Lupa from "../../../assets/icons/Lupa.png";
import Notificación from "../../../assets/icons/Notificación.png";
import Alcancia from "../../../assets/icons/Alcancia.png";
const Gestiona = () => {
  return (
    <section className="pt-14 sm:pt-24 max-w-6xl px-8 mx-auto rounded-tl-[70px] rounded-br-[70px]">
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary max-w-4xl mx-auto font-bold mb-4">Gestiona.io detecta, organiza y optimiza tus gastos recurrentes automáticamente.</h2>
      </div>
      <List img={Lupa}/>
      <List img={Notificación}/>
      <List img={Alcancia}/>
    </section>
  );
};

export default Gestiona;
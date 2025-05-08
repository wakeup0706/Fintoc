import ButtonPluse from "../common/ButtonPlus";
import { ChileLogo } from "../icons";

const AddAccount = () => {
  return (
    <div className="bg-primary p-4 rounded-l-2xl w-full">
      <div className="bg-white text-ct-grey rounded-full max-w-24 flex px-4 py-1"><ChileLogo className="w-6 h-6"/>Chile</div>
      <div className=" text-white text-md font-semibold my-4">Agrega más cuentas</div>
      <ButtonPluse bgColor="primary" text="Correo electrónico" />
      <ButtonPluse bgColor="primary" text="Cuenta Bancaria" />
      <ButtonPluse bgColor="white" text="Tarjeta de Crédito" />
    </div>
  );
};

export default AddAccount;

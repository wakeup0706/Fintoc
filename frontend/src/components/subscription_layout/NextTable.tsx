const transactions = [""];

  const NextSubscriptionTable  = () => {
    return (
      <div className="px-4 sm:px-0">
        <div className="rounded-2xl bg-secondary w-full overflow-hidden mt-16">
          <div className="bg-ct-grey py-3 text-white text-xl font-bold pl-8">Suscripciones</div>
          <div className="w-full text-left text-sm p-4">
            <div className="text-ct-grey font-semibold border-b-2 border-gray-500 grid grid-flow-col text-center">
              <div className="py-2">Empresa</div>
              <div className="py-2">Fecha de cobro</div>
              <div className="py-2">Cuenta</div>
              <div className="py-2">Monto</div>
            </div>
            <div className="flex text-2xl justify-center items-center py-20" >
              No tienes suscripciones conectadas a Gestiona
            </div>
          </div>

          <button className="mx-auto bg-primary text-white font-semibold px-8 py-2 mb-3 rounded-full hover:bg-purple-800 transition block">Agregar Suscripción</button>
          </div>
        </div>
    );
  };

  export default NextSubscriptionTable;
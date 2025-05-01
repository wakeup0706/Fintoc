const List = ({img}:{img:string}) => {
  return (
      <div className="text-center my-4 flex">
        <div className="w-14 h-14 p-3 rounded-xl bg-primary"><img src={img} alt="img" className="w-full"/></div>
        <h2 className="sm:text-1xl md:text-2xl text-ct-grey max-w-4xl mx-auto font-bold mb-4">Detecta automáticamente tus suscripciones activas.</h2>
      </div>
  );
};

export default List;
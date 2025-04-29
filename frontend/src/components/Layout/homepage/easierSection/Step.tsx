const Step = ({ icon, title, description, href_url }:{icon:string, title: string, description:string, href_url:string}) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
          <img src={icon} alt="" className="w-9 h-9" />
        </div>
      </div>
      <div className="text-left">
        <h3 className="text-primary font-bold text-2xl">{title}</h3>
        <p className="text-ct-grey text-xl">{description}</p>
        <a href={href_url} className="text-primary font-semibold text-xl hover:underline">Más información</a>
      </div>
    </div>
  );
};

export default Step;



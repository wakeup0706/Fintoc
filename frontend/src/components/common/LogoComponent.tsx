import Logo from "../../assets/logo.svg";

const LogoComponent = ({imgSize, textSize='2xl'}:{imgSize:string, textSize:string}) => {
  return (
    <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className={`max-w-[100px] w-${imgSize}`}/>
        <span className={`font-bold text-${textSize} text-ct-grey`}>gestiona</span>
    </div>
  );
};

export default LogoComponent;
const SiderbarMenu = ({bgColor, text}:{bgColor:string, text:string}) => {
  return (
    <div className={`rounded-2xl border-2 border-primary px-3 pt-[5px] pb-[3px] font-md bg-${bgColor} text-${ bgColor=='white' ? 'primary' : 'white' }`}>
      {text}
    </div>
  );
};

export default SiderbarMenu;
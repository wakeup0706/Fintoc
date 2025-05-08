const ButtonPluse = ({ bgColor="primary", text}:{ bgColor:string, text:string}) => {
  return (
    <button
      className={`bg-${bgColor} text-${bgColor=="white" ? "primary" : 'white'} w-full flex items-center justify-between px-[6px] py-1 rounded-full font-light text-sm border-2 my-3`}
    >
      {text}
      <span className={`ml-2 text-[20px] font-medium rounded-full border-2 border-${bgColor=="white" ? "primary" : 'white'} px-[3px]`} >+</span>
    </button>
  );
};

export default ButtonPluse;
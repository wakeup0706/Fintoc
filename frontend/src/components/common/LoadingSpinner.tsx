const LoadingSpinner = ( { styles } : { styles : string } ) => {
  return (
    <div className={styles}>
      <div className="w-full h-full border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
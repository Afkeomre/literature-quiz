const Button = ({ children, onClick, disabled = false, ref }) => {
  return (
    <button className="btn" onClick={onClick} disabled={disabled} ref={ref}>
      {children}
    </button>
  );
};

export default Button;

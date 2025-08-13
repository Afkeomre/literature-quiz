const RadioButton = ({
  parentClass,
  children,
  onChange,
  id,
  radioName,
  radioValue,
  checked = false,
}) => {
  return (
    <div className={`${parentClass} radio-button`}>
      <div className="radio-button__wrapper">
        <input
          className="radio-button__real"
          type="radio"
          id={id}
          name={radioName}
          value={radioValue}
          onChange={(e) => onChange(e.target.value)}
          defaultChecked={checked}
        />
        <span className="radio-button__custom"></span>
      </div>
      <label htmlFor={id} className="radio-button__label">
        {children}
      </label>
    </div>
  );
};

export default RadioButton;

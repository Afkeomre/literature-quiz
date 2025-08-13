const Option = ({
  itemClass,
  isSelected,
  isCorrect,
  isDisabled,
  letter,
  text,
  onClick,
}) => {
  const buttonClasses =
    `option__btn ` +
    (isDisabled ? 'option__btn_disabled ' : '') +
    (isSelected && !isCorrect ? 'option__btn_incorrect ' : '') +
    (isCorrect && isDisabled ? 'option__btn_correct ' : '');

  return (
    <li className={`${itemClass} option`}>
      <button className={buttonClasses} onClick={onClick} disabled={isDisabled}>
        <span className="option__letter">{letter}</span>
        <span className="option__text">{text}</span>
      </button>
    </li>
  );
};

export default Option;

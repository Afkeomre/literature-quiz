import Option from './Option';

const OptionsList = ({
  listClass,
  itemClass,
  options,
  selectedAnswer,
  activeQuestion,
  onClick,
}) => {
  return (
    <ul className={listClass}>
      {options.map((option, i) => (
        <Option
          key={i}
          itemClass={itemClass}
          isSelected={selectedAnswer === i}
          isCorrect={i === activeQuestion.correct}
          isDisabled={selectedAnswer !== undefined}
          {...option}
          onClick={() => onClick(i)}
        />
      ))}
    </ul>
  );
};

export default OptionsList;

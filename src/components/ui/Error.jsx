import { Link } from 'react-router';

const Error = ({ message }) => {
  return (
    <div className="error">
      <h3 className="error__title">{message}</h3>
      <Link className="error__link link" to="/">
        На главную
      </Link>
    </div>
  );
};

export default Error;

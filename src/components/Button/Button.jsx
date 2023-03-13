import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClickLoadMore, children }) => {
  return (
    <button className={css.Button} type="button" onClick={onClickLoadMore}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;

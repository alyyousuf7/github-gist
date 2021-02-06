import PropTypes from 'prop-types';

import './Badge.css';

function Badge({ children }) {
  return <div className="badge">{children}</div>;
}

Badge.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Badge;

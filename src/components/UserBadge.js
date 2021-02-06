import PropTypes from 'prop-types';

import './UserBadge.css';

function UserBadge({ username, avatar }) {
  return <div className="user-badge">
    <img src={avatar} alt={username} /> {username}
  </div>
}

UserBadge.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserBadge;

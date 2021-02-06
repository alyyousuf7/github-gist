import { useState } from 'react';
import PropTypes from 'prop-types';

import './SearchForm.css';

function SearchForm({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="submit" value="search" />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default SearchForm;

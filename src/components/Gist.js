import PropTypes from 'prop-types';

import Badge from './Badge';
import UserBadge from './UserBadge';

import './Gist.css';

function Gist({ url, description, filetypes, forks }) {
  return <div className="gist">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="gist-description"
    >
      {description || '[no description]'}
    </a>
    <ul className="list-filetype">
      {filetypes.map((filetype, i) => <li key={i} className="list-item-filetype">
        <Badge>{filetype}</Badge>
      </li>)}
    </ul>
    <ul className="list-fork">
      {forks && forks.map((fork, i) => <li key={i} className="list-item-fork">
        <a
          href={fork.url}
          target="_blank"
          rel="noopener noreferrer"
          className="gist-description"
        >
          <UserBadge username={fork.owner.login} avatar={fork.owner.avatar} />
        </a>
      </li>)}
    </ul>
  </div>
}

Gist.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  filetypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  forks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gist;

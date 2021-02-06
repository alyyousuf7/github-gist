import PropTypes from 'prop-types';

function GistList({ children, onClickNext, onClickPrev }) {
  return <div>
    <input type="button" value ="prev" onClick={onClickPrev} />
    {children.length > 0 && <input type="button" value ="next" onClick={onClickNext} />}
    <ul className="list-gist">
      {children.map((gist, i) => <li key={i} className="list-item-gist">
        {gist}
      </li>)}
    </ul>
  </div>
}

GistList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
};

export default GistList;

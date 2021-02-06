import useGistSearch from './useGistSearch';
import Gist from '../components/Gist';
import GistList from '../components/GistList';
import SearchForm from '../components/SearchForm';

import './GistSearch.css';

function GistSearch({ pageSize }) {
  const { pending, error, gists, loadGists, nextPage, prevPage } = useGistSearch(pageSize);

  return (
    <div>
      <SearchForm onSubmit={(username) => loadGists(username)} />
      {pending && 'Loading...'}
      {error && error.message}
      {gists && <GistList onClickNext={nextPage} onClickPrev={prevPage}>{
        gists.map((gist, i) => <Gist
          key={i}
          url={gist.url}
          description={gist.description}
          filetypes={gist.filetypes}
          forks={gist.forks}
        />)
      }</GistList>}
      {gists && gists.length === 0 && 'no gists...'}
    </div>
  );
}

export default GistSearch;

import GistSearch from './pages/GistSearch';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        eventmobi-gist
      </header>
      <GistSearch pageSize={5} />
    </div>
  );
}

export default App;

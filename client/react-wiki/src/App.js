import logo from './logo.svg';
import './App.css';
async function article()
{
  const url = 'http://localhost:3000/articleAPI/articles/9143fe9c-46a9-4ba6-8c68-904c0f528024'
  const response = await fetch(url);
  const commits = await response.json();
  return(
    <div>
      commits.getArticle;
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

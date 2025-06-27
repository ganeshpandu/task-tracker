import logo from './logo.svg';
import './App.css';

function App() {
  // Access the environment variable
  const apiKey = process.env.REACT_APP_API_KEY;
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Display the API key */}
        <div style={{ margin: '20px', padding: '10px', background: '#282c34' }}>
          <p>API Key: {apiKey || 'Not set'}</p>
        </div>
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


import './App.css';

function App() {
  let name = '리액트';

  return (
    <div className="App">
      <h1 className="test">
        Hello,
        {name === '리액트' ? <span>ys</span> : null}
        /!!
      </h1>
      <p>방가</p>
    </div>
  );
}

export default App;
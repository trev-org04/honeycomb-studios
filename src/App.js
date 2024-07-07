import './App.css';
import hexagon from './assets/hexagon.svg';
import ItemDisplay from './itemDisplay.tsx';

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="title">HONEYCOMB STUDIOS</span>
        <div>
          <img src={hexagon} className="header-hexagon" alt="logo"></img>
          <img src={hexagon} className="header-hexagon" alt="logo"></img>
          <img src={hexagon} className="header-hexagon" alt="logo"></img>
        </div>
      </div>
      <div className="content-container">
          <span className="product-header">PRODUCTS</span>
      </div>
      <ItemDisplay></ItemDisplay>
    </div>
  );
}

export default App;

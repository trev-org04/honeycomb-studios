import './App.css';
import ItemDisplay from './itemDisplay';

function App() {
  return (
    <div className="App">
      <div class="header">
        <span class="title">HONEYCOMB STUDIOS</span>
      </div>
      <div class="content-container">
          <span class="product-header">PRODUCTS</span>
      </div>
      <ItemDisplay></ItemDisplay>
    </div>
  );
}

export default App;

import "../App.css";
import hexagon from "../assets/hexagon.svg";
import ItemDisplay from "../components/itemDisplay.tsx";

function Home() {
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
          <span className="product-header">JUST DROPPED!</span>
      </div>
      <ItemDisplay category="new"></ItemDisplay>

      <div className="content-container">
          <span className="product-header">MUSIC</span>
      </div>
      <ItemDisplay category="music"></ItemDisplay>

      <div className="content-container">
          <span className="product-header">OTHER</span>
      </div>
      <ItemDisplay category="other"></ItemDisplay>

      <div className="content-container">
          <span className="product-header">SWATCHES</span>
      </div>
      <ItemDisplay category="swatches"></ItemDisplay>

    </div>
  );
}

export default Home;

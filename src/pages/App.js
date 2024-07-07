import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin.js";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;

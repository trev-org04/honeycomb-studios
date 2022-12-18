import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './home/home';
import Products from './products/products';

function App() {
  return (
    <Router>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
    </Routes>
    </Router>
);
}

export default App;

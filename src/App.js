import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Contact from './contact/contact';
import Home from './home/home';
import Products from './products/products';

function App() {
  return (
    <Router>
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/contact' element={<Contact />} />
    </Routes>
    </Router>
);
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import Blogs from './components/Blog/Blogs';
import Create from './components/Blog/Create';

import logo from './logo.svg';
import './App.css';
import Update from './components/Blog/Update';
import Delete from './components/Blog/Delete';



function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

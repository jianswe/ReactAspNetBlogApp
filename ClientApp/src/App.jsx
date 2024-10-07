import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Blogs from './components/Blog/Blogs';
import Create from './components/Blog/Create';
import Update from './components/Blog/Update';
import Delete from './components/Blog/Delete';
import Register from './components/Register';
import Login from './components/Login';

import './App.css';

function App() {
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('userToken'); // Fetch the token from local storage or another source
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

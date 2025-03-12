import './App.css';
import Nav from './components/Nav';
import React, { Component } from 'react';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className='bg-dark text-light min-vh-100'>
        <Router>
          <Nav />

          <Routes>
          <Route path="/" element={<News key="home" country="us" category="business" />} />
            <Route path="/general" element={<News key="general" country="us" category="general" />} />
            <Route path="/business" element={<News key="business" country="us" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" />} />
            <Route path="/health" element={<News key="health" country="us" category="health" />} />
            <Route path="/science" element={<News key="science" country="us" category="science" />} />
            {/* <Route path="/home" element={<News key="home" country="us" category="home" />} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}

// src/App.jsx - Main React Application

import React from 'react';
import Header from './components/Header';
import ConnectionStatus from './components/ConnectionStatus';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <ConnectionStatus />
        </div>
      </main>
      <footer className="footer">
        <p>MongoDB Connect © 2024 | Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;
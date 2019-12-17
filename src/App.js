import React from 'react';

import './App.css';

import Routes from './routes'
import logo from './assets/completa_fundo_escuro@4x.png';
function App() {
  return (
    <div className="container">
      <a href="http://couponfeed.co">
        <img className="cflogo" src={logo} alt="CouponFeed" />
      </a>
      <div className="content">
        <Routes />

      </div>
    </div>
  );
}

export default App;

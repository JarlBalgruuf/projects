import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style.css';

class Header extends Component {
  render() {
    return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-black">
        <div className="container">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <NavLink className="border-white main-home" to="/">Home page</NavLink>
        </ul>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <NavLink to="/about" className='border-white'>About</NavLink>
              <NavLink to="/contact" className='border-white'>Contact</NavLink>
            </ul>
            <NavLink to="https://twitter.com/" className='border-white-logo'><img className='link-media' src="https://pngimg.com/uploads/twitter/twitter_PNG15.png" alt="Twit"></img></NavLink>
          </div>
        </div>
      </nav>
    </header>
    )
  }
}

export default Header;
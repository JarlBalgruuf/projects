import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3 bg-black">
        <div className="container">
          <ul>
            <p>Copyright © 2023</p>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer;
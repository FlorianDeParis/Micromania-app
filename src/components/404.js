import React, { Component } from 'react';
import logo from '../assets/img/dead-robot.png';
import '../assets/css/404.css';

class NotFound extends Component {
  render() {
    return (
      <div className="Error-App">
        <header className="Error-App-header">
          <img src={logo} className="Error-App-logo" alt="logo" />
          <p>
            Marty ! Nous venons d'ouvrir une faille spatio-temporelle !
            <span className="error-code">404 page not found!</span>
          </p>
          <a
            className="Error-App-link"
            href="/"
            target="_self"
            rel="noopener noreferrer"
          >
            Retour à l'accueil
          </a>
        </header>
      </div>
    );
  }
}

export default NotFound;

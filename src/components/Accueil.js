import React, { Component } from 'react';
import logo from '../assets/img/Micromania-Logo.png';
import '../assets/css/Accueil.css';

var thisComponentClassName = 'Accueil';

class Accueil extends Component {
  render() {
    return (
      <div className={thisComponentClassName+"-App"}>
        <header className={thisComponentClassName+"-App-header"}>
          <img src={logo} className={thisComponentClassName+"-App-logo"} alt="logo" />
          <p>
            Bienvenue sur le site de géolocalisation des magasins
          </p>
          <a
            className={thisComponentClassName+"-App-link"}
            href="/map"
            target="_self"
            rel="noopener noreferrer"
          >
            Commencer
          </a>
        </header>
      </div>
    );
  }
}

export default Accueil;

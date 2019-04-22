import React, { Component } from 'react';
import logo from '../assets/img/Micromania-Logo.png';
import logoMini from '../assets/img/logo-min-tr.png';
import '../assets/css/MyMap.css';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
//import {TextInput} from "react-native";

import { combineReducers, createStore } from 'redux';
import database from '../assets/datas/database.json';


// Just for testing purposes .....
function coordinatesReducer(state = '', action){
  switch(action.type){
    case 'updateCity':
        return action.payload;
  }

  return state;
}

const store = createStore(
  coordinatesReducer, 
  {
    city: 'Paris'
  },
  window.devToolsExtension && window.devToolsExtension()
);

const updateUserAction = {
  type: 'updateCity',
  payload: {
      city: 'Lyon'
  }
}

store.dispatch(updateUserAction)
// .....


const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 48.861158, lng: 2.3430334 }}
  >

    {props.shopList
    .filter(x => x.selected)
    .map(x => (
      <Marker
        key={x.idShop} 
        position={{lat: x.lat, lng: x.long}}
        icon={logoMini}
      >
      </Marker>
    ))}
  </GoogleMap>
);

function ShopItemInList(props){
  return (
    <li 
      className="shopEntry"
      data-idshop={props.shopObject.idShop} 
      onClick={() => {
        props.updateSelectedState(props.shopObject)
      }} 
      data-selected={props.shopObject.selected} 
    >{props.shopObject.Name}<span>{props.shopObject.Adresse}</span></li>
  )
}

class MyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentList: database.map(x => Object.assign({},x,{selected:false, lat:parseFloat(x.lat), long:parseFloat(x.long)}))
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prepareCSVDownload = this.prepareCSVDownload.bind(this);
  }

  // Just for testing events...
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Just for testing events...
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    updateUserAction.payload.city = this.state.value;
    store.dispatch(updateUserAction)
    //console.log("-- custom affectation --");
    //console.log(store.getState());
  }

  updateSelectedState = (shopObject) => {
    this.setState({
      currentList: this.state.currentList.map(x => {
        if(x.idShop === shopObject.idShop){
          return Object.assign({},x,{selected:!x.selected});
        } 
        return x;
      })
    });
  }

  renderShopList(){
    return (
      <ul className="liste-shops">
        {this.state.currentList.map(x => (
          <ShopItemInList key={x.idShop} shopObject={x} updateSelectedState={this.updateSelectedState}/>
        ))}
      </ul>
    );
  }

  prepareCSVDownload(){
    var CSVDoc = ["Votre Liste de magasins,,,,"];
    var CSVString = "";
    var shops = ["Identifiant,Nom du magasin,Description,Adresse,Telephone"];
    this.state.currentList.forEach(function(thisShop){
      if(thisShop.selected === true){
        var tmp = [thisShop.idShop, thisShop.Name, thisShop.Desc, thisShop.Adresse, thisShop.Telephone]
        shops.push(tmp.join(","))
      }
    });

    Array.prototype.push.apply(CSVDoc,shops)
    CSVString = CSVDoc.join("%0A");
    var CSVLink = document.createElement("a");
    CSVLink.href = 'data:attachment/csv,' + CSVString;
    CSVLink.target = "_self";
    CSVLink.download = "liste_des_magasins_micromania.csv";
    document.body.appendChild(CSVLink);
    CSVLink.click();
  }

  render() {
    return (
      <div className="MyMap-App">
        <nav className="NavBar">
          <img src={logo} className="Navlogo" alt="logo" />
          RECHERCHEZ VOTRE MAGASIN A PROXIMITE
        </nav>
        <header className="MyMap-App-header"></header>
        <form className="FormMyMap" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="rechercher" />
          <input type="submit" value="" />
        </form>
        <div className="MyMap-gmap-wrapper">
          <MapWithAMarker
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          shopList={this.state.currentList}
          className="gmap"
          />
        </div>
        {this.renderShopList()}
        <button className="getAllShops" onClick={this.prepareCSVDownload} value={this.state.currentList} >Téléch. les fiches magasins</button>
        <button className="moreInfoOnShop">+ Infos sur le magasin</button>
      </div>
    );
  }
}

export default MyMap;

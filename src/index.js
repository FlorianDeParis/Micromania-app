import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './components/App';
import Accueil from './components/Accueil';
import NotFound from './components/404';
import MyMap from './components/MyMap';
import * as serviceWorker from './serviceWorker';

// Import react-router
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { combineReducers, createStore } from 'redux';

// these Reducers are for testing
function productsReducer(state = [], action){
    return state;
}

function userReducer(state = '', action){
    switch(action.type){
        case 'updateUser':
            return action.payload;
    }

    return state;
}

const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer
});

const store = createStore(
    allReducers, 
    {
        products: [{name: 'testNom'}],
        user: 'Jean Dupond'
    },
    window.devToolsExtension && window.devToolsExtension()
);
console.log(store.getState());

const updateUserAction = {
    type: 'updateUser',
    payload: {
        user: 'Jacques'
    }
}

store.dispatch(updateUserAction)

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Accueil}></Route>
            <Route exact path="/error404" component={NotFound}></Route>
            <Route exact path="/map" component={MyMap}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </Router>
)


ReactDOM.render(
    <Root />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

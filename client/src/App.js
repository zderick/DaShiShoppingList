import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppNavBar from './Component/AppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingList from './Component/ShoppingList'
import ItemModal from "./Component/ItemModal"
import { Container } from "reactstrap"
import { loadUser } from './actions/authActions'

import { Provider } from 'react-redux';
import store from './Store'; 


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <AppNavBar />
          <Container>
            <ItemModal/>
            <ShoppingList />
          </Container>

        </div>
      </Provider>
    );
  }
}

export default App;

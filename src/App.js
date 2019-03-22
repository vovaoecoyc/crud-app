import React, { Component, Fragment } from 'react';
import AppContext from './Context';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/hoc/PrivateRoute';
import FormAuth from './containers/FormAuth';
import ListItems from './containers/ListItems';
import EditItem from './containers/EditItem';
import CreateItem from './containers/CreateItem';
import Toolbar from './components/Toolbar';
import { requestInstance } from './axios';
import { errorMessage } from './constants';

class App extends Component {
  state = {
    auth: {
      token: null,
      isAuthorized: false,
      error: null,
    },
    data: [],
  };

  componentDidMount() {
    this.checkAuthUser();
    this.getInstancesList(localStorage.getItem('token'));
  }

  checkAuthUser() {
    localStorage.getItem('token') &&
      this.setState(prevState => {
        prevState.auth.isAuthorized = true;
        prevState.auth.token = localStorage.getItem('token');
        return prevState;
      });
  }

  authUser = (login, password, routeHistory) => {
    requestInstance
      .post('/login_check', {
        username: login,
        password: password,
      })
      .then(response => {
        console.log(response);
        this.setState(prevState => {
          const auth = {
            token: response.data.token,
            isAuthorized: true,
            error: null,
          };
          return { ...prevState, auth: { ...auth } };
        });
        localStorage.setItem('token', response.data.token);
        this.getInstancesList(response.data.token);
        routeHistory.push('/list');
      })
      .catch(error => {
        this.setState(prevState => {
          prevState.auth.isAuthorized = false;
          prevState.auth.error = errorMessage;
          return prevState;
        });
      });
  };

  getInstancesList = token => {
    requestInstance
      .get('/rabbit/list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState(prevState => {
          prevState.data = response.data;
          return prevState;
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  createInstance = (name, weight, token) => {
    requestInstance
      .post('/rabbit', `rabbit[name]=${name}&rabbit[weight]=${weight}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log(response);
        this.getInstancesList(token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeInstance = (id, name, weight, token) => {
    requestInstance
      .post(`/rabbit/${id}`, `rabbit[name]=${name}&rabbit[weight]=${weight}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log(response);
        this.getInstancesList(token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  removeInstance = (id, token) => {
    requestInstance
      .delete(`/rabbit/${id}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log(response);
        this.getInstancesList(token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          authUser: this.authUser,
          createInstance: this.createInstance,
          changeInstance: this.changeInstance,
          removeInstance: this.removeInstance,
          ...this.state,
        }}
      >
        <Fragment>
          <Toolbar />
          <Switch>
            <PrivateRoute
              path="/list"
              isAuthorized={this.state.auth.isAuthorized}
              component={ListItems}
            />
            <PrivateRoute
              path="/edit/:number"
              isAuthorized={this.state.auth.isAuthorized}
              component={EditItem}
            />
            <PrivateRoute
              path="/create"
              isAuthorized={this.state.auth.isAuthorized}
              component={CreateItem}
            />
            <PrivateRoute
              path="/"
              exact={true}
              isAuthorized={this.state.auth.isAuthorized}
              component={ListItems}
            />
            <Route
              path="/login"
              render={propsRoute => (
                <FormAuth {...propsRoute} isAuthorized={this.state.auth.isAuthorized} />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </Fragment>
      </AppContext.Provider>
    );
  }
}

export default App;

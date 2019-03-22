import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import AppContext from '../../Context';

class FormAuth extends Component {
  static contextType = AppContext;
  state = {
    fields: {
      login: {
        type: 'text',
        name: 'login',
        placeholder: 'Enter login',
        value: '',
      },
      password: {
        type: 'password',
        name: 'password',
        placeholder: 'Enter password',
        value: '',
      },
    },
  };

  handlerChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      prevState.fields[name].value = value;
      return prevState;
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state.fields;
    this.setState(prevState => {
      prevState.fields.login.value = '';
      prevState.fields.password.value = '';
      return prevState;
    });
    this.context.authUser(login.value, password.value, this.props.history);
  };

  render() {
    const content = (
      <Card className="w-25 ml-auto mr-auto mt-3">
        <CardBody>
          <Form onSubmit={this.handlerSubmit}>
            <FormGroup className="m-auto d-flex flex-column">
              <Input {...this.state.fields.login} onChange={this.handlerChange} />
              <Input
                {...this.state.fields.password}
                className="mt-3"
                onChange={this.handlerChange}
              />
              {this.context.auth.error && (
                <div className="mt-3 ml-auto mr-auto text-danger">{this.context.auth.error}</div>
              )}
              <Button type="submit" className="w-35 ml-auto mr-auto btn btn-info mt-3">
                Log In
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
    return !this.props.isAuthorized ? content : <Redirect to="/" />;
  }
}

export default FormAuth;

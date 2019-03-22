import React, { Component } from 'react';
import { Form, Input, Button, Card, CardTitle, CardBody } from 'reactstrap';

import AppContext from '../../Context';

class EditItem extends Component {
  static contextType = AppContext;
  state = {
    fields: {
      name: {
        type: 'text',
        name: 'name',
        placeholder: 'Enter rabbit name',
        value: this.props.location.state.name,
      },
      weight: {
        type: 'text',
        name: 'weight',
        placeholder: 'Enter rabbit weight',
        value: this.props.location.state.weight,
      },
    },
  };

  handlerChange = e => {
    let { name, value } = e.target;
    name === 'weight' && (value = value.replace(/[^0-9.]/, ''));
    this.setState(prevState => {
      prevState.fields[name].value = value;
      return prevState;
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { id } = this.props.location.state,
      { name, weight } = this.state.fields;
    this.context.changeInstance(id, name.value, weight.value, this.context.auth.token);
    this.props.history.push('/list');
  };

  render() {
    return (
      <Card className="w-25 ml-auto mr-auto mt-3">
        <CardTitle className="text-center mt-2">Change specifications of rabbit</CardTitle>
        <CardBody>
          <Form onSubmit={this.handlerSubmit} className="d-flex flex-column justify-content-center">
            <Input onChange={this.handlerChange} {...this.state.fields.name} />
            <Input onChange={this.handlerChange} {...this.state.fields.weight} className="mt-3" />
            <Button type="submit" className="ml-auto mr-auto w-25 btn btn-success mt-3">
              Save
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default EditItem;

import React, { Component } from 'react';
import { Button } from 'reactstrap';

import AppContext from '../../../Context';

class Item extends Component {
  static contextType = AppContext;

  handlerEdit = () => {
    const {
      routeHistory,
      data: { id },
    } = this.props;
    routeHistory.push(`/edit/${id}`, { ...this.props.data });
  };

  handlerRemove = () => {
    const {
      data: { id },
    } = this.props;
    this.context.removeInstance(id, this.context.auth.token);
  };

  render() {
    const { name, weight } = this.props.data;
    return (
      <tr className="text-center">
        <td>{name}</td>
        <td>{weight}</td>
        <td className="d-flex">
          <Button onClick={this.handlerEdit} className="btn btn-sm btn-success">
            Edit
          </Button>
          <Button onClick={this.handlerRemove} className="btn btn-sm btn-danger ml-2">
            Remove
          </Button>
        </td>
      </tr>
    );
  }
}

export default Item;

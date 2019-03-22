import React, { Component } from 'react';
import { Table } from 'reactstrap';

import Item from './Item';
import AppContext from '../../Context';

class ListItems extends Component {
  static contextType = AppContext;

  render() {
    const { data } = this.context;
    return (
      <Table className="w-50 mt-3 mr-auto ml-auto table-striped table-bordered">
        <thead>
          <tr className="text-center">
            <th className="w-50">Name</th>
            <th className="w-50">Weight</th>
            <th className="w-25">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(value => (
            <Item key={value.id} routeHistory={this.props.history} data={value} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ListItems;

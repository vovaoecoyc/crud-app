import React, { Fragment } from 'react';

import NavItem from '../NavItem';
import AppContext from '../../Context';

const NavList = () => {
  return (
    <AppContext.Consumer>
      {({ auth }) => {
        const items = auth.isAuthorized ? (
          <Fragment>
            <NavItem path="/list">List</NavItem>
            <NavItem path="/create">Create</NavItem>
          </Fragment>
        ) : (
          <NavItem path="/login">Login</NavItem>
        );
        return <ul className="nav d-flex justify-content-center">{items}</ul>;
      }}
    </AppContext.Consumer>
  );
};

export default NavList;

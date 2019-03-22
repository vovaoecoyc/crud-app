import React from 'react';
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const NavItem = ({ path, children, ...rest }) => {
  return (
    <li className="nav-item">
      <NavLink
        {...rest}
        tag={RRNavLink}
        to={path}
        className="nav-link"
        activeClassName="text-secondary"
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;

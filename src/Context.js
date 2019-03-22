import React from 'react';

const AppContext = React.createContext({
  authUser: () => ({}),
});

export default AppContext;

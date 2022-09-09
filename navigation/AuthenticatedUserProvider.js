//

import React, { useState, createContext } from 'react';

//Create context to later observe whether user is authenticated or not
export const AuthenticatedUserContext = createContext({});

//AuthenticationUserProvider is a wrapper that starts with user at null
//The user hook can then be updated, and is stored in the wrapper itself 
export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
import React from 'react';

//Context is globally available javascript value (object, array, string number etc.)
const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});

export default authContext;
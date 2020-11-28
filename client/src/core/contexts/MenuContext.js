import React from 'react';

const MenuContext = React.createContext({
    showMenu: 'none',
    isConnectedViaTiers: false
});

export default MenuContext;
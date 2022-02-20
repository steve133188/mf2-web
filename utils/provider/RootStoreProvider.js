import React, { createContext, useContext } from 'react';
import  RootStore  from '../stores/';

const StoreContext = createContext( new RootStore());
StoreContext.displayName = 'RootStoreContext';

const useRootStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
};

const RootStoreProvider = ({ store, children }) => {
    // only create root store once (store is a singleton)
    // const root =useRootStore;
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export { useRootStore, StoreContext, RootStoreProvider };

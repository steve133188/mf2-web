import React, { createContext, useContext } from 'react';
import { RootStore } from '../stores/';

const StoreContext = createContext;
StoreContext.displayName = 'RootStoreContext';

const useRootStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
};

const RootStoreProvider = children => {
    // only create root store once (store is a singleton)
    const root = new RootStore();
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export { useRootStore, StoreContext, RootStoreProvider };

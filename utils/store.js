import { createContext, useContext } from 'react';
import { observable } from 'mobx';

export const storeContext = createContext(Object.create(null));


export const observableStore = observable({
    rootStore: { lang: 'en' }
});

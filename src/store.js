import React from 'react';
import {observable} from 'mobx';


const store = observable({
    email:'',
    publicAddress: '',
    isLoggedIn: false,
    userMetadata: {},
    magic: {},
    setMagic: m => {
        store.magic = m;
    },
    setEmail: e => {
        store.email = e;
    },
    setPublicAddress: p => {
        store.publicAddress = p;
    },
    setIsLoggedIn: l => {
        store.isLoggedIn = l;
    },
    setUserMetadata: u => {
        store.userMetadata = u;
    },

});


export default store;
import store from './store';

const getStore = ()=> store; // get store
const getState = (reducer, state) => store.getState()[reducer][state]; // get global state of store

const subscribe = subs => store.subscribe(subs); // subscribe to store and lsiten to every state changes 

const dispatch = ({ type, payload = null }) => { // dispatch action type and payload data to store
  store.dispatch({ type, payload });
};

export default {
  getStore,
  dispatch,
  subscribe,
  getState,
};

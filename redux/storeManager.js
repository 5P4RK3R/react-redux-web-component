import store from './store';


const getState = (reducer, state) => store.getState()[reducer][state];

const subscribe = subs => store.subscribe(subs);

const dispatch = ({ type, payload = null }) => {
  store.dispatch({ type, payload });
};

export default {
  dispatch,
  subscribe,
  getState,
};
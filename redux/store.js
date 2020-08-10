import { createStore,applyMiddleware } from 'redux';
import reducers from './reducer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialSate = {};
const middleWare = [reduxThunk];
export default createStore(
  reducers,initialSate, composeWithDevTools(applyMiddleware(...middleWare))
);


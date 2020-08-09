import {
    FETCH_PEOPLE,
    FETCH_PERSON,
    INCREMENT_SCORE
} from "./types";
import storeManager from '../storeManager'
export const fetchPeople = () => async dispatch => {
    
    storeManager.dispatch({ type: FETCH_PEOPLE });
};
export const fetchPerson = () => async dispatch => {
    
    storeManager.dispatch({ type: FETCH_PERSON });
};
export const increment = (scoreId) => async dispatch => {
    console.log(scoreId)
    storeManager.dispatch({ type: INCREMENT_SCORE,payload:scoreId });
};
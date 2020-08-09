import {
    FETCH_PEOPLE,FETCH_PERSON,INCREMENT_SCORE
} from "../actions/types";

import {componentPayload} from '../../data/componentPayload';
import {statePayload} from '../../data/statePayload';
const initialState = {
    componentPayload: componentPayload,
    statePayload: statePayload
};

export default function(state = initialState,action){
    switch(action.type){
        case FETCH_PEOPLE:
        return {
            ...state,
            componentPayload: state.componentPayload,
        };
        case FETCH_PERSON:
            return {
                ...state,
                statePayload:state.statePayload
            }
        case INCREMENT_SCORE:
            let score = state.statePayload[action.payload].initialValue+1
            state.statePayload[action.payload].initialValue = score
            return {
                ...state,
                statePayload:state.statePayload
            }
        default:
        return state;
    }
}
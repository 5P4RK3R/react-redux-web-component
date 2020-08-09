import { createSlice } from '@reduxjs/toolkit';

import {componentPayload} from '../data/componentPayload';
import {statePayload} from '../data/statePayload';
export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    componentPayload: componentPayload,
    statePayload:statePayload
  },
  reducers: {
      incrementScore: (state,action) =>{
        state.statePayload[action.payload].initialValue++;
      }
  },
});

export const { incrementScore } = peopleSlice.actions;

export const selectPeople = state => state.people.componentPayload[0];
export const selectPerson = state => state.people.statePayload;

export default peopleSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Cumpleaños de Jorge',
    start: moment().toDate().toISOString(),
    // start: moment().toDate(),
    end: moment().add(2, 'hours').toDate().toISOString(),
    bdcolor: '#fafafa',
    notes: 'Comprar pasteles',
    user: {
      _id: '123',
      name: 'Richard'
    }
  }],
  activeEvent: null
}


export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    activeEvent: (state, action) => {
      // action.payload.start = moment(action.payload.start).toDate().toISOString;
      // action.payload.end = moment(action.payload.end).toDate().toISOString();
      action.payload.start = new Date(action.payload.start).toISOString();
      action.payload.end = new Date(action.payload.end).toISOString();
      // state.activeEvent = action.payload;
      return {
        ...state.activeEvent,
        ...action.payload
      }
    },
    addEvent: (state, action) => {
      // action.payload.start = moment(action.payload.start).toDate().toISOString();
      // action.payload.end = moment(action.payload.end).toDate().toISOString();
      action.payload.start = new Date(action.payload.start).toISOString();
      action.payload.end = new Date(action.payload.end).toISOString();
      action.payload.id = new Date().getTime();
      action.payload.background = '#fafafa';
      // state.events.push(action.payload);
      return {
        ...state, 
        events: [...state.events, { ...action.payload }],
      }
      // return {
      //   ...state,
      //   events: [
      //     ...state.events,
      //     action.payload
      //   ]
      // }
    },
    clearEvent: (state, action) => { },
    updateEvent: (state, action) => { },
    deleteEvent: (state, action) => { },
  }
})

export const { activeEvent, addEvent, clearEvent, updateEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
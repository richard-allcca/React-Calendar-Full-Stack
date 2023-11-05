import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  // bgcolor: '#cc4100', // FIXME - NO FUNCIONA
  bgColor: 'hsl(211, 100%, 40%)', // FIXME - NO FUNCIONA
  title: 'Event 1',
  notes: 'comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),// fecha y cantidad de horas
  user: {
    _id: '123',
    name: 'Richard'
  }
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [ tempEvent ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload;
        }
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent !== null) {
        state.events = state.events.filter(event => {
          return event._id !== state.activeEvent._id;
        });
        state.activeEvent = null;
      }
    },
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;

// export default calendarSlice.reducer;
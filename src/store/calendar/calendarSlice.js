import { createSlice } from '@reduxjs/toolkit';

// const tempEvent = {
//   _id: new Date().getTime(),
//   // bgcolor: '#cc4100', // FIXME - NO FUNCIONA
//   bgColor: 'hsl(211, 100%, 40%)', // FIXME - NO FUNCIONA
//   title: 'Event 1',
//   notes: 'comprar el pastel',
//   start: new Date(),
//   end: addHours(new Date(), 2),// fecha y cantidad de horas
//   user: {
//     _id: '123',
//     name: 'Richard'
//   }
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoading: true,
    events: [],
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
    onUpdateEvent: (state, { payload = [] }) => {
      state.events = state.events.map(event => {
        if (event.id === payload.id) {
          return payload;
        }else {
          return event;
        }
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent !== null) {
        state.events = state.events.filter(event => {
          return event.id !== state.activeEvent.id;
        });
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) =>{
      state.isLoading = false;
      payload.forEach(event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id);
        if(!exists) {
          state.events.push((event));
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.events = [];
    },
  }
});

export const {
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar
} = calendarSlice.actions;

// export default calendarSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './features/events/eventSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    event: eventReducer
    //TODO: authReducer,
  }
});

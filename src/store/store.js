import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from './';



export const store = configureStore({
  reducer: {
    modal: uiSlice.reducer
  }
})
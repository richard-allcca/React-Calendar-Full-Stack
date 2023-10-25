import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state) => {
			state.open = true;
		},
		closeModal: (state) => {
			state.open = false;
		}
	}
});

// state
// export const getStateModal = (state) => state.modal;
// destructura actions de "reducers"
export const { openModal, closeModal } = modalSlice.actions;

// export del reducer
export default modalSlice.reducer;

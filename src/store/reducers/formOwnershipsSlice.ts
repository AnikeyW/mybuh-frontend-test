import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormOwnerships } from '../../models';

interface FormOwnershipsState {
	formOwnerships: IFormOwnerships[];
	isLoading: boolean;
	error: string;
}
const initialState: FormOwnershipsState = {
	formOwnerships: [],
	isLoading: false,
	error: '',
};

export const formOwnershipsSlice = createSlice({
	name: 'formOwnerships',
	initialState,
	reducers: {
		formOwnershipsFetching: (state) => {
			state.isLoading = true;
		},
		formOwnershipsFetchingSuccess: (state, action: PayloadAction<IFormOwnerships[]>) => {
			state.isLoading = false;
			state.formOwnerships = action.payload;
			state.error = '';
		},
		formOwnershipsFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { formOwnershipsFetching, formOwnershipsFetchingSuccess, formOwnershipsFetchingError } =
	formOwnershipsSlice.actions;

export default formOwnershipsSlice.reducer;

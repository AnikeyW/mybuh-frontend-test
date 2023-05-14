import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaxForm } from '../../models';

interface TaxFormState {
	taxFormGuide: ITaxForm[];
	isLoading: boolean;
	error: string;
}
const initialState: TaxFormState = {
	taxFormGuide: [],
	isLoading: false,
	error: '',
};

export const taxFormSlice = createSlice({
	name: 'taxFormGuide',
	initialState,
	reducers: {
		taxFormFetching: (state) => {
			state.isLoading = true;
		},
		taxFormFetchingSuccess: (state, action: PayloadAction<ITaxForm[]>) => {
			state.isLoading = false;
			state.taxFormGuide = action.payload;
			state.error = '';
		},
		taxFormFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { taxFormFetching, taxFormFetchingSuccess, taxFormFetchingError } = taxFormSlice.actions;

export default taxFormSlice.reducer;

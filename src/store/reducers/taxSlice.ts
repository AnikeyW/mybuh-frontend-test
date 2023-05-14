import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITax } from '../../models';

interface TaxState {
	taxes: ITax[];
	isLoading: boolean;
	error: string;
}
const initialState: TaxState = {
	taxes: [],
	isLoading: false,
	error: '',
};

export const taxSlice = createSlice({
	name: 'tax',
	initialState,
	reducers: {
		taxFetching: (state) => {
			state.isLoading = true;
		},
		taxFetchingSuccess: (state, action: PayloadAction<ITax[]>) => {
			state.isLoading = false;
			state.taxes = action.payload;
			state.error = '';
		},
		taxFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { taxFetching, taxFetchingSuccess, taxFetchingError } = taxSlice.actions;

export default taxSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany } from '../../models';

interface CompaniesState {
	companies: ICompany[];
	isLoading: boolean;
	error: string;
}
const initialState: CompaniesState = {
	companies: [],
	isLoading: false,
	error: '',
};

export const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		companiesFetching: (state) => {
			state.isLoading = true;
		},
		companiesFetchingSuccess: (state, action: PayloadAction<ICompany[]>) => {
			state.isLoading = false;
			state.companies = action.payload;
			state.error = '';
		},
		companiesFetchingError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { companiesFetching, companiesFetchingSuccess, companiesFetchingError } = companiesSlice.actions;

export default companiesSlice.reducer;

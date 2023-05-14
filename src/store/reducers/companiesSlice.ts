import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany } from '../../models';

interface CompaniesState {
	companies: ICompany[];
	isLoading: boolean;
	error: string;
	selectedCompany: ICompany | null;
}
const initialState: CompaniesState = {
	companies: [],
	isLoading: false,
	error: '',
	selectedCompany: null,
};

export const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setSelectedCompany: (state, action: PayloadAction<number | null>) => {
			if (action.payload) {
				state.selectedCompany = state.companies.find((company) => company.company_id === action.payload) || null;
			} else {
				state.selectedCompany = null;
			}
		},
		deleteCompany: (state, action: PayloadAction<number | null>) => {
			console.log(action.payload);
			state.companies = state.companies.filter((company) => company.company_id !== action.payload);
		},
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

export const {
	// setIsDeleteModal,
	setSelectedCompany,
	deleteCompany,
	companiesFetching,
	companiesFetchingSuccess,
	companiesFetchingError,
} = companiesSlice.actions;

export default companiesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany } from '../../models';

interface CompaniesState {
	companies: ICompany[];
	isLoading: boolean;
	error: string;
	selectedCompany: ICompany;
}
const initialState: CompaniesState = {
	companies: [],
	isLoading: false,
	error: '',
	selectedCompany: { company_id: 0, company_tin: '', company_name: '', logo: null, form_id: 0, tax_id: 0 },
};

export const companiesSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		editCompany: (state, action: PayloadAction<ICompany>) => {
			state.companies = state.companies.map((company) => {
				if (company.company_id === action.payload.company_id) {
					return action.payload;
				}
				return company;
			});
			console.log(state.companies);
		},
		setSelectedCompany: (state, action: PayloadAction<number>) => {
			state.selectedCompany =
				state.companies.find((company) => company.company_id === action.payload) || initialState.selectedCompany;
		},
		deleteCompany: (state, action: PayloadAction<number | null>) => {
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
	editCompany,
	setSelectedCompany,
	deleteCompany,
	companiesFetching,
	companiesFetchingSuccess,
	companiesFetchingError,
} = companiesSlice.actions;

export default companiesSlice.reducer;

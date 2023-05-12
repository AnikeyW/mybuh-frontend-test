import axios from 'axios';
import { companiesFetching, companiesFetchingSuccess, companiesFetchingError } from './companiesSlice';
import { AppDispatch } from '../store';
import { ICompany } from '../../models';

export const fetchCompanies = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(companiesFetching());
		const response = await axios.get<ICompany[]>(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/companies.json'
		);
		dispatch(companiesFetchingSuccess(response.data));
	} catch (e: any) {
		dispatch(companiesFetchingError('Ошибка получения списка компаний!'));
		console.log(e.message);
	}
};

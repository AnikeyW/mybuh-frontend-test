import axios from 'axios';
import { companiesFetching, companiesFetchingSuccess, companiesFetchingError } from './companiesSlice';
import { AppDispatch } from '../store';
import { ICompany, IFormOwnerships } from '../../models';
import {
	formOwnershipsFetching,
	formOwnershipsFetchingSuccess,
	formOwnershipsFetchingError,
} from './formOwnershipsSlice';

// export const fetchFormOwnerships = () => async (dispatch: AppDispatch) => {}

export const fetchFormOwnerships = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(formOwnershipsFetching());
		const response = await axios.get<IFormOwnerships[]>(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/ownerships.json'
		);
		dispatch(formOwnershipsFetchingSuccess(response.data));
	} catch (e: any) {
		dispatch(formOwnershipsFetchingError('Ошибка получения справочника форм собственности компаний!'));
		console.log(e.message);
	}
};

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

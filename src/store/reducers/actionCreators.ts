import axios from 'axios';
import { companiesFetching, companiesFetchingSuccess, companiesFetchingError } from './companiesSlice';
import { AppDispatch } from '../store';
import { ICompany, IFormOwnerships, ITax, ITaxForm } from '../../models';
import {
	formOwnershipsFetching,
	formOwnershipsFetchingSuccess,
	formOwnershipsFetchingError,
} from './formOwnershipsSlice';
import { taxFetching, taxFetchingError, taxFetchingSuccess } from './taxSlice';
import { taxFormFetching, taxFormFetchingError, taxFormFetchingSuccess } from './taxFormSlice';

export const fetchTaxForms = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(taxFormFetching());
		const response = await axios.get<ITaxForm[]>(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/form-to-system.json'
		);
		dispatch(taxFormFetchingSuccess(response.data));
	} catch (e: any) {
		dispatch(taxFormFetchingError('Ошибка получения справочника соотношения форм налогообложения и собственности!'));
		console.log(e.message);
	}
};

export const fetchTaxes = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(taxFetching());
		const response = await axios.get<ITax[]>(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/tax-systems.json'
		);
		dispatch(taxFetchingSuccess(response.data));
	} catch (e: any) {
		dispatch(taxFetchingError('Ошибка получения справочника форм налогообложения!'));
		console.log(e.message);
	}
};

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

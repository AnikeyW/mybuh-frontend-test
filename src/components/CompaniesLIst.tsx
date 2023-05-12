import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCompanies, fetchFormOwnerships } from '../store/reducers/actionCreators';
import CompanyItem from './CompanyItem';

const Box = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const CompaniesLIst = () => {
	const dispatch = useAppDispatch();
	const { companies } = useAppSelector((state) => state.companies);
	const { formOwnerships } = useAppSelector((state) => state.formOwnerships);

	useEffect(() => {
		dispatch(fetchCompanies());
		dispatch(fetchFormOwnerships());
	}, []);

	if (!companies.length) return null;
	if (!formOwnerships.length) return null;
	return (
		<Box>
			{companies.map((company) => (
				<CompanyItem
					company={company}
					formOwnerships={formOwnerships.find((form) => form.id === company.form_id)}
					key={company.company_id}
				/>
			))}
		</Box>
	);
};

export default CompaniesLIst;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCompanies, fetchFormOwnerships, fetchTaxes, fetchTaxForms } from '../store/reducers/actionCreators';
import CompanyItem from './CompanyItem';
import Modal from './Modal';
import { setSelectedCompany } from '../store/reducers/companiesSlice';
import DeleteContent from './DeleteContent';
import EditContent from './EditContent';

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
	const { companies, selectedCompany } = useAppSelector((state) => state.companies);
	const { formOwnerships } = useAppSelector((state) => state.formOwnerships);
	const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
	const [isEditModal, setIsEditModal] = useState<boolean>(false);

	const openDeleteModal = (id: number) => {
		dispatch(setSelectedCompany(id));
		setIsDeleteModal(true);
	};

	const openEditModal = (id: number) => {
		dispatch(setSelectedCompany(id));
		setIsEditModal(true);
	};

	useEffect(() => {
		dispatch(fetchFormOwnerships());
		dispatch(fetchTaxForms());
		dispatch(fetchTaxes());
		dispatch(fetchCompanies());
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
					openDeleteModal={openDeleteModal}
					openEditModal={openEditModal}
				/>
			))}
			{selectedCompany && (
				<Modal active={isDeleteModal} setActive={setIsDeleteModal}>
					<DeleteContent setIsDeleteModal={setIsDeleteModal} />
				</Modal>
			)}
			{selectedCompany && (
				<Modal active={isEditModal} setActive={setIsEditModal}>
					<EditContent setIsEditModal={setIsEditModal} />
				</Modal>
			)}
		</Box>
	);
};

export default CompaniesLIst;

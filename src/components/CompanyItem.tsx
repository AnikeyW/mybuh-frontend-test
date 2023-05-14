import React from 'react';
import styled from 'styled-components';
import { ICompany, IFormOwnerships } from '../models';
import DeleteCompanyButton from '../assets/icon-delete.svg';
import EditCompanyButton from '../assets/icon-edit.svg';
import DefaultLogo from '../assets/logo-default.svg';

const CompanyItemBox = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 24px 32px;
	gap: 20px;
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	line-height: 19px;

	width: 578px;
	height: 120px;

	background: #ffffff;
	box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
	border-radius: 6px;
	&:hover {
		border: 1px solid #208ad9;
		box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		padding: 22px 31px;
	}
`;

const CompanyLogo = styled.div`
	width: 72px;
	height: 72px;
	& img {
		width: 100%;
		height: 100%;
	}
`;
const CompanyTitle = styled.div`
	display: flex;
`;

const CompanyInfo = styled.div`
	flex: auto;
	height: 65px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const CompanyInfoBank = styled.div`
	display: flex;
`;
const CompanyButtons = styled.div`
	display: flex;
`;
const CompanyButton = styled.div`
	width: 24px;
	height: 24px;
	margin-left: 21px;
	&:hover {
		cursor: pointer;
	}
	& img {
		width: 100%;
		height: 100%;
	}
`;
interface CompanyItemProps {
	company: ICompany;
	formOwnerships: IFormOwnerships | undefined;
	openDeleteModal: (id: number) => void;
	openEditModal: (id: number) => void;
}
const CompanyItem = (props: CompanyItemProps) => {
	const { company, formOwnerships, openDeleteModal, openEditModal } = props;

	return (
		<CompanyItemBox>
			<CompanyLogo>
				<img src={company.logo ? company.logo : DefaultLogo} alt="Logo" />
			</CompanyLogo>
			<CompanyInfo>
				<CompanyTitle>
					{formOwnerships?.short} {company.company_name}
				</CompanyTitle>
				<CompanyInfoBank>ИИН/БИН {company.company_tin}</CompanyInfoBank>
			</CompanyInfo>
			<CompanyButtons>
				<CompanyButton onClick={() => openEditModal(company.company_id)}>
					<img src={EditCompanyButton} alt="Редактировать" />
				</CompanyButton>
				<CompanyButton onClick={() => openDeleteModal(company.company_id)}>
					<img src={DeleteCompanyButton} alt="Удалить" />
				</CompanyButton>
			</CompanyButtons>
		</CompanyItemBox>
	);
};

export default CompanyItem;

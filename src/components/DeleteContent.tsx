import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { deleteCompany, setSelectedCompany } from '../store/reducers/companiesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const ButtonStyles = {
	width: '149px',
	height: '39px',
};

const Title = styled.div`
	font-family: Open Sans;
	font-size: 16px;
	font-weight: 600;
	line-height: 22px;
	letter-spacing: 0em;
	text-align: center;
	color: rgba(72, 99, 119, 1);
`;

const Info = styled.div`
	font-family: Open Sans;
	font-size: 14px;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: center;
	color: rgba(38, 38, 38, 1);
	margin: 20px 0px;
`;

interface DeleteContentProps {
	setIsDeleteModal: (arg: boolean) => void;
}
const DeleteContent: React.FC<DeleteContentProps> = ({ setIsDeleteModal }) => {
	const dispatch = useAppDispatch();
	const { selectedCompany } = useAppSelector((state) => state.companies);

	return (
		<>
			<Title>Удаление организации</Title>
			<Info>Вы уверены, что хотите удалить организацию из списка?</Info>
			<div>
				<Button
					type="default"
					style={ButtonStyles}
					onClick={() => {
						setIsDeleteModal(false);
						dispatch(setSelectedCompany(null));
					}}
				>
					Отменить
				</Button>
				<Button
					type="primary"
					style={{ width: '285px', height: '39px', marginLeft: '20px' }}
					onClick={() => {
						dispatch(deleteCompany(selectedCompany ? selectedCompany.company_id : null));
						dispatch(setSelectedCompany(null));
						setIsDeleteModal(false);
					}}
				>
					Удалить
				</Button>
			</div>
		</>
	);
};

export default DeleteContent;

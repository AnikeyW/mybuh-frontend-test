import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Radio, Space, Select, Input, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { setSelectedCompany } from '../store/reducers/companiesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FormOwnships, SubFormOwnships } from '../constants/const';

const Box = styled.div`
	width: 500px;
	margin: 5px;
`;
const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Open Sans';
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 25px;
	color: #262626;
	margin: 15px 0px;
`;
const Label = styled.div`
	font-family: 'Open Sans';
	font-size: 12px;
	line-height: 16px;
	color: #808080;
	margin: 3px 0px;
`;
const InputGroup = styled.div`
	margin-bottom: 15px;
`;

const SubmitButton = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 25px;
`;

const RadioButtonsStyles: CSSProperties = {
	fontFamily: 'Open Sans',
	fontSize: '16px',
	lineHeight: '22px',
	width: '158px',
	height: '46px',
	textAlign: 'center',
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '12px 63px',
	borderRadius: '5px',
};

const RadioButtonsSpaceStyles = {
	fontFamily: 'Open Sans',
	fontSize: '16px',
	lineHeight: '22px',
	color: '#808080',
};

const RadioOwnShipsStyles = {
	display: 'flex',
	justifyContent: 'space-between',
};

interface EditContentProps {
	setIsEditModal: (arg: boolean) => void;
}

const EditContent: React.FC<EditContentProps> = ({ setIsEditModal }) => {
	const dispatch = useAppDispatch();
	const { selectedCompany } = useAppSelector((state) => state.companies);
	const { formOwnerships } = useAppSelector((state) => state.formOwnerships);
	const { taxFormGuide } = useAppSelector((state) => state.taxFormGuide);
	const { taxes } = useAppSelector((state) => state.tax);
	const [formOwnshipsValue, setFormOwnshipsValue] = useState(selectedCompany?.form_id);
	const [subFormOwnshipsValue, setSubFormOwnshipsValue] = useState(SubFormOwnships.TOOIP);
	const [formOwnshipsSelectValue, setFormOwnshipsSelectValue] = useState(selectedCompany?.form_id.toString());
	const [taxSelectValue, setTaxSelectValue] = useState('0');
	const [iinInputValue, setIinInputValue] = useState(selectedCompany?.company_tin);
	const [companyNameInputValue, setCompanyNameInputValue] = useState(selectedCompany?.company_name);

	useEffect(() => {
		if (selectedCompany?.form_id === FormOwnships.TOO || selectedCompany?.form_id === FormOwnships.IND_PRED) {
			setFormOwnshipsValue(selectedCompany?.form_id);
		} else {
			setFormOwnshipsValue(FormOwnships.ELSE);
		}
		if (selectedCompany) {
			setTaxSelectValue(selectedCompany.tax_id.toString());
		} else {
			setTaxSelectValue('0');
		}
		setIinInputValue(selectedCompany?.company_tin);
		setCompanyNameInputValue(selectedCompany?.company_name);
		setFormOwnshipsSelectValue(selectedCompany?.form_id.toString());
	}, [selectedCompany]);

	const formOwnshipsHandler = ({ target: { value } }: RadioChangeEvent) => {
		setFormOwnshipsValue(value);
		// setSubFormOwnshipsValue(SubFormOwnships.TOOIP);
		// setFormOwnshipsSelectValue('0');
		// setTaxSelectValue('0');
	};

	const subFormOwnshipsHandler = ({ target: { value } }: RadioChangeEvent) => {
		setSubFormOwnshipsValue(value);
		setFormOwnshipsSelectValue('0');
	};

	const filteringFormOwnerships = useCallback(() => {
		const filteredFormOwnerships = formOwnerships
			.filter((form) => form.account_type === subFormOwnshipsValue)
			.map((form) => {
				return { value: form.id.toString(), label: form.full };
			});
		filteredFormOwnerships.push({ value: '0', label: 'Выбрать' });
		return filteredFormOwnerships;
	}, [subFormOwnshipsValue, selectedCompany]);

	const filterTaxSystem = useCallback(() => {
		let filteredTaxFormGuide;
		if (formOwnshipsValue === FormOwnships.TOO || formOwnshipsValue === FormOwnships.IND_PRED) {
			filteredTaxFormGuide = taxFormGuide.filter((taxForm) => taxForm.form_ownership_id === formOwnshipsValue);
		} else {
			filteredTaxFormGuide = taxFormGuide.filter(
				(taxForm) =>
					taxForm.form_ownership_id !== FormOwnships.TOO && taxForm.form_ownership_id !== FormOwnships.IND_PRED
			);
		}
		const filteredTaxSystems = filteredTaxFormGuide.map((taxForm) => {
			const taxSystem = taxes.find((tax) => tax.id === taxForm.tax_system_id);
			return { value: taxSystem?.id.toString(), label: taxSystem?.full };
		});
		filteredTaxSystems.push({ value: '0', label: 'Выбрать' });
		return filteredTaxSystems;
	}, [formOwnshipsValue, selectedCompany]);
	filterTaxSystem();

	if (!selectedCompany) {
		return null;
	}
	return (
		<Box>
			<Title>Редактирование данных организации</Title>
			<InputGroup>
				<Radio.Group
					value={formOwnshipsValue}
					onChange={formOwnshipsHandler}
					buttonStyle="solid"
					style={RadioOwnShipsStyles}
				>
					<Radio.Button style={RadioButtonsStyles} value={FormOwnships.TOO}>
						ТОО
					</Radio.Button>
					<Radio.Button style={RadioButtonsStyles} value={FormOwnships.IND_PRED}>
						ИП
					</Radio.Button>
					<Radio.Button style={RadioButtonsStyles} value={FormOwnships.ELSE}>
						Прочие
					</Radio.Button>
				</Radio.Group>
			</InputGroup>
			{formOwnshipsValue !== FormOwnships.IND_PRED && formOwnshipsValue !== FormOwnships.TOO && (
				<InputGroup>
					<Radio.Group value={subFormOwnshipsValue} onChange={subFormOwnshipsHandler}>
						<Space direction="vertical">
							<Radio style={RadioButtonsSpaceStyles} value={SubFormOwnships.TOOIP}>
								Юридические лица
							</Radio>
							<Radio style={RadioButtonsSpaceStyles} value={SubFormOwnships.CHP}>
								Частная практика
							</Radio>
							<Radio style={RadioButtonsSpaceStyles} value={SubFormOwnships.FIZ}>
								Физические лица
							</Radio>
						</Space>
					</Radio.Group>
				</InputGroup>
			)}
			{subFormOwnshipsValue !== SubFormOwnships.FIZ && formOwnshipsValue === FormOwnships.ELSE && (
				<InputGroup>
					<Label>Выберите форму собственности</Label>
					<Select
						style={{ width: '100%' }}
						value={formOwnshipsSelectValue}
						onChange={(e: string) => {
							console.log(typeof e);
							setFormOwnshipsSelectValue(e);
						}}
						options={filteringFormOwnerships()}
					/>
				</InputGroup>
			)}
			{subFormOwnshipsValue !== SubFormOwnships.CHP && subFormOwnshipsValue !== SubFormOwnships.FIZ && (
				<InputGroup>
					<Label>Выберите систему налогообложения</Label>
					<Select
						style={{ width: '100%' }}
						value={taxSelectValue}
						onChange={(val: string) => {
							setTaxSelectValue(val);
						}}
						options={filterTaxSystem()}
					/>
				</InputGroup>
			)}
			<InputGroup>
				<Label>Введите ИИН/БИН</Label>
				<Input
					value={iinInputValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setIinInputValue(e.target.value);
					}}
					placeholder="Введите ИИН/БИН"
				/>
			</InputGroup>
			<InputGroup>
				<Label>Введите название компании</Label>
				<Input
					value={companyNameInputValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCompanyNameInputValue(e.target.value);
					}}
					addonBefore={'ЮЛ'}
					placeholder="Введите название компании"
				/>
			</InputGroup>
			<SubmitButton>
				<Button
					type="primary"
					style={{ backgroundColor: 'rgba(0, 154, 62, 1)', width: '170px', height: '43px ' }}
					onClick={() => {
						dispatch(setSelectedCompany(null));
						setIsEditModal(false);
					}}
				>
					Сохранить
				</Button>
			</SubmitButton>
		</Box>
	);
};

export default EditContent;

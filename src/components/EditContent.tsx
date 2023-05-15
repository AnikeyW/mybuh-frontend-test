import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Radio, Space, Select, Input, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { editCompany } from '../store/reducers/companiesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { TypeOwnships } from '../constants/const';

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
	const [formOwnshipsValue, setFormOwnshipsValue] = useState('');
	const [subFormOwnshipsValue, setSubFormOwnshipsValue] = useState('');
	const [formOwnshipsSelectValue, setFormOwnshipsSelectValue] = useState(selectedCompany.form_id);
	const [optionsFormOwnshipsSelect, setOptionsFormOwnshipsSelect] = useState<any>([]);

	const [taxSelectValue, setTaxSelectValue] = useState(selectedCompany.tax_id);
	const [optionsTaxSelect, setOptionsTaxSelect] = useState<any>([]);

	const [iinInputValue, setIinInputValue] = useState('');
	const [companyNameInputValue, setCompanyNameInputValue] = useState('');
	const [addonBeforeCompanyName, setAddonBeforeCompanyName] = useState('');

	function filteringFormOwnerships(subFormOwnshipsVal: string) {
		return formOwnerships
			.filter((form) => form.account_type === subFormOwnshipsVal)
			.map((form) => {
				return { value: form.id, label: form.full };
			});
	}

	function filteringTaxSystems() {
		const filteredTaxFormGuide = taxFormGuide.filter(
			(taxForm) => taxForm.form_ownership_id === selectedCompany.form_id
		);

		const filteredTaxSystems = filteredTaxFormGuide.map((taxForm) => {
			const taxSystem = taxes.find((tax) => tax.id === taxForm.tax_system_id);
			return { value: taxSystem?.id, label: taxSystem?.full };
		});
		return filteredTaxSystems;
	}

	const subFormOwnshipsHandler = ({ target: { value } }: RadioChangeEvent) => {
		setSubFormOwnshipsValue(value);
		const filteredFormOwnerships = filteringFormOwnerships(value);
		setOptionsFormOwnshipsSelect(filteredFormOwnerships);
		setFormOwnshipsSelectValue(filteredFormOwnerships[0].value);
		const filteredTax = filteringTaxSystems();
		setOptionsTaxSelect(filteredTax);
		setTaxSelectValue(filteredTax[0]?.value || 0);
		const shortName = formOwnerships.find((form) => form.account_type === value)?.short || '';
		setAddonBeforeCompanyName(shortName);
	};

	const submitHandler = () => {
		const editedCompany = {
			company_id: selectedCompany.company_id,
			company_name: companyNameInputValue || selectedCompany.company_name,
			company_tin: iinInputValue || selectedCompany.company_tin,
			form_id:
				formOwnshipsValue === TypeOwnships.IP || formOwnshipsValue === TypeOwnships.TOO
					? selectedCompany.form_id
					: formOwnshipsSelectValue,
			tax_id: taxSelectValue,
			logo: selectedCompany.logo,
		};
		console.log(editedCompany);
		dispatch(editCompany(editedCompany));
		setIsEditModal(false);
	};

	useEffect(() => {
		const formCompany = formOwnerships.find((form) => form.id === selectedCompany.form_id)?.account_type;
		const shortName = formOwnerships.find((form) => form.id === selectedCompany.form_id)?.short || '';
		setAddonBeforeCompanyName(shortName);
		if (formCompany === TypeOwnships.TOO || formCompany === TypeOwnships.IP) {
			setFormOwnshipsValue(formCompany);
		} else {
			setFormOwnshipsValue(TypeOwnships.ELSE);
			const isJur = formOwnerships.find((form) => form.id === selectedCompany.form_id)?.is_jur;
			if (isJur) {
				setSubFormOwnshipsValue(TypeOwnships.TOO);
			} else {
				const code = formOwnerships.find((form) => form.id === selectedCompany.form_id)?.code;
				if (formCompany === TypeOwnships.CHP || code === TypeOwnships.CHP) {
					setSubFormOwnshipsValue(TypeOwnships.CHP);
				} else {
					setSubFormOwnshipsValue(TypeOwnships.FIZ);
				}
			}
		}

		const filteredFormOwnerships = filteringFormOwnerships(subFormOwnshipsValue);
		setOptionsFormOwnshipsSelect(filteredFormOwnerships);
		setFormOwnshipsSelectValue(filteredFormOwnerships[0]?.value);

		const filteredTax = filteringTaxSystems();
		setOptionsTaxSelect(filteredTax);
		setTaxSelectValue(filteredTax[0]?.value || 0);

		setIinInputValue(selectedCompany.company_tin);
		setCompanyNameInputValue(selectedCompany.company_name);
		console.log();
	}, [selectedCompany]);

	if (!selectedCompany) {
		return null;
	}
	return (
		<Box>
			<Title>Редактирование данных организации</Title>
			<InputGroup>
				<Radio.Group value={formOwnshipsValue} buttonStyle="solid" style={RadioOwnShipsStyles}>
					<Radio.Button style={RadioButtonsStyles} value={TypeOwnships.TOO}>
						ТОО
					</Radio.Button>
					<Radio.Button style={RadioButtonsStyles} value={TypeOwnships.IP}>
						ИП
					</Radio.Button>
					<Radio.Button style={RadioButtonsStyles} value={TypeOwnships.ELSE}>
						Прочие
					</Radio.Button>
				</Radio.Group>
			</InputGroup>
			{formOwnshipsValue !== TypeOwnships.IP && formOwnshipsValue !== TypeOwnships.TOO && (
				<InputGroup>
					<Radio.Group value={subFormOwnshipsValue} onChange={subFormOwnshipsHandler}>
						<Space direction="vertical">
							<Radio style={RadioButtonsSpaceStyles} value={TypeOwnships.TOO}>
								Юридические лица
							</Radio>
							<Radio style={RadioButtonsSpaceStyles} value={TypeOwnships.CHP}>
								Частная практика
							</Radio>
							<Radio style={RadioButtonsSpaceStyles} value={TypeOwnships.FIZ}>
								Физические лица
							</Radio>
						</Space>
					</Radio.Group>
				</InputGroup>
			)}
			{subFormOwnshipsValue !== TypeOwnships.FIZ && formOwnshipsValue === TypeOwnships.ELSE && (
				<InputGroup>
					<Label>Выберите форму собственности</Label>
					<Select
						style={{ width: '100%' }}
						value={formOwnshipsSelectValue}
						onChange={(e: number) => {
							setFormOwnshipsSelectValue(e);
						}}
						options={optionsFormOwnshipsSelect}
					/>
				</InputGroup>
			)}
			{(formOwnshipsValue === TypeOwnships.TOO ||
				formOwnshipsValue === TypeOwnships.IP ||
				(formOwnshipsValue === TypeOwnships.ELSE && subFormOwnshipsValue === TypeOwnships.TOO)) && (
				<InputGroup>
					<Label>Выберите систему налогообложения</Label>
					<Select
						style={{ width: '100%' }}
						value={taxSelectValue}
						onChange={(val: number) => {
							setTaxSelectValue(val);
						}}
						options={optionsTaxSelect}
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
					addonBefore={addonBeforeCompanyName}
					placeholder="Введите название компании"
				/>
			</InputGroup>
			<SubmitButton>
				<Button
					type="primary"
					style={{ backgroundColor: 'rgba(0, 154, 62, 1)', width: '170px', height: '43px ' }}
					onClick={submitHandler}
				>
					Сохранить
				</Button>
			</SubmitButton>
		</Box>
	);
};

export default EditContent;

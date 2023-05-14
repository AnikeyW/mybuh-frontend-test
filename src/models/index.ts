export interface ICompany {
	company_id: number;
	company_name: string;
	company_tin: string;
	form_id: number;
	tax_id: number;
	logo: string | null;
}

export interface IFormOwnerships {
	id: number;
	code: string;
	full: string;
	short: string;
	is_jur: boolean;
	parent_id: number | null;
	account_type: string | null;
}

export interface ITax {
	id: number;
	code: string;
	full: string;
	short: string;
	parent_id: number | null;
}

export interface ITaxForm {
	tax_system_id: number;
	form_ownership_id: number;
}

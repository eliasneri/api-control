import {Roles} from "../enum/product";

export interface DurationDate {
    hours: number;
    minutes: number;
}

export interface CheckCompany {
    "status": number,
    "id_inCRM": number,
    "name_company": string
    "contracted_logins": number,
    "company_available": boolean,
    "product_available": boolean,
    "company_product_expired": Date | null
}

export interface User {
    "user_name": string,
    "user_cpf_cnpj": string,
    "user_phone_number": string,
    "user_email": string,
    "user_password": string,
    "user_fk_company_id": number,
    "user_fk_role_id": number,
    "user_use_crm": boolean,
    "user_active": boolean
}

export interface Company {
    "company_id": number,
    "company_abbreviation": string,
    "company_cnpj": string,
    "company_name": string,
    "company_fantasy": string,
    "company_zip_code": string,
    "company_street": string,
    "company_number": number,
    "company_district": string,
    "company_fk_state_id": number,
    "company_fk_city_id": number,
    "company_complement": string,
    "company_phone": string,
    "company_mail": string,
    "company_cellphone": string,
    "amount_logins_product": number,
    "user_password": string
}
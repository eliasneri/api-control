import {Company, User} from "../../../interfaces/interfacesGenerics";
import {knexFLW} from "../../../config/databaseFLWConfig";
import {Roles} from "../../../enum/product";

export class FastFlowModel {

    static async insertNewCompany(company: Company): Promise<number> {
        let idCompanyCreated: number = 0;
        try {
            const created: any = await knexFLW('companies')
                .insert({
                    company_fk_crm_id: company.company_id,
                    company_abbreviation: company.company_abbreviation,
                    company_cnpj: company.company_cnpj,
                    company_name: company.company_name,
                    company_fantasy: company.company_fantasy,
                    company_zip_code: company.company_zip_code,
                    company_street: company.company_street,
                    company_number: company.company_number,
                    company_district: company.company_district,
                    company_fk_state_id: company.company_fk_state_id,
                    company_fk_city_id: company.company_fk_city_id,
                    company_complement: company.company_complement,
                    company_phone: company.company_phone,
                    company_mail: company.company_mail,
                    company_cellphone: company.company_cellphone,
                    company_project_qtd_users: company.amount_logins_product,
                    company_project_valid: true
                })
                .returning('company_id');
                idCompanyCreated = created[0].company_id;
        } catch (error){
            idCompanyCreated = 0;
            console.log(error);
        }
        return idCompanyCreated;
    }

    static async insertNewUser (company: Company, idCompanyGenerated: number): Promise<User> {
        var newUser: User = {
            user_name: "not created",
            user_cpf_cnpj: "000",
            user_phone_number: "000",
            user_email: "not created",
            user_password: "not created",
            user_fk_company_id: 0,
            user_fk_role_id: 0,
            user_use_crm: false,
            user_active: false
        }
        try {
            newUser = await knexFLW('users')
                .insert({
                    user_name: company.company_name,
                    user_cpf_cnpj: company.company_cnpj,
                    user_phone_number: company.company_phone,
                    user_email: company.company_mail,
                    user_password: "202cb962ac59075b964b07152d234b70", // converter em MD5
                    user_fk_company_id: idCompanyGenerated,
                    user_fk_role_id: Roles.ADMIN,
                    user_use_crm: true,
                    user_active: true
                })
                .returning('user_name', 'user_fk_role_id')
        } catch (error) {
            console.error(error)
        }
        return newUser;
    }

    static async newUserNec(company: Company, idCompanyGenerated: number) {
        try {
            await knexFLW('users')
                .insert({
                    user_name: "MASTERNEC - " + company.company_abbreviation.toUpperCase(),
                    user_cpf_cnpj: company.company_cnpj,
                    user_phone_number: company.company_phone,
                    user_email: company.company_abbreviation.toLowerCase() + "@necbrasil.com.br",
                    user_password: "202cb962ac59075b964b07152d234b70", // 123
                    user_fk_company_id: idCompanyGenerated,
                    user_fk_role_id: Roles.MASTER,
                    user_use_crm: true,
                    user_active: true,
                    user_exclude: true
                })
        } catch (error) {
            console.error(error)
        }
    }


}
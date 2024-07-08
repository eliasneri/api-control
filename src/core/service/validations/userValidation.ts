import {knexFLW} from "../../config/databaseFLWConfig";

export class UserValidation {

    static async userExistsForCompany(companyCnpj: string, companyEmail: string): Promise<boolean> {
        let ok: boolean = false;
        try {
            const count: number = await knexFLW('users')
                .count('* as count')
                .where('user_cpf_cnpj', companyCnpj )
                .andWhere('user_email', companyEmail);
                ok = count > 0;
        } catch (error) {
            console.error(error);
        }
        return ok;
    }
}
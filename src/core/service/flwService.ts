import {knexFLW} from "../config/databaseFLWConfig";
import {Company, User} from "../interfaces/interfacesGenerics";
import {CnpjValidations} from "./validations/cnpjValidations";
import {UserValidation} from "./validations/userValidation";
import {FastFlowModel} from "./model/fastflow/fastFlowModel";
import {errors} from "undici-types";

export class flwService {

   static newCompany = async (company : Company): Promise<User> => {
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
         if (company) {
            const companyExist: boolean = await CnpjValidations.findByCnpj(company.company_cnpj);
            const userExist: boolean = await UserValidation.userExistsForCompany(company.company_cnpj, company.company_mail);

            if (!companyExist && !userExist) {
               const insertCompanyId: number = await FastFlowModel.insertNewCompany(company);
               if (insertCompanyId !=0) {
                  newUser = await FastFlowModel.insertNewUser(company, insertCompanyId);

                  const emailNec: string = company.company_abbreviation.toLowerCase() + "@necbrasil.com.br"
                  const existMasterNec: boolean =  await UserValidation.userExistsForCompany(company.company_cnpj, emailNec);
                  if (!existMasterNec) {
                     await FastFlowModel.newUserNec(company, insertCompanyId);
                  }
               } else {
                  throw new Error("Erro ao gerar código da Empresa no Fast Flow!");
               }
            } else {
                  throw new Error("Empresa já possui cadastro no FAST FLOW !!");
            }
         } else {
            throw new Error("Erro ao ler objeto");
         }
      } catch (error) {
         console.error(error);
      }
      return newUser;
   }
}


import {knexFLW} from "../../config/databaseFLWConfig";
export class  CnpjValidations {

   static findByCnpj = async (cnpj: string): Promise<boolean> => {
      try {
         const cnpjExist = await knexFLW
            .select('company_cnpj')
            .from('companies')
            .where('company_cnpj', cnpj);

         return cnpjExist.length > 0;
      } catch (error) {
         console.error(error);
         return false;
      }
   }
}
import express, {Router} from "express";
import {getTestFLW, newCompany, getCnpjCompany} from "../core/controller/flwController";

const flwRoutes = express.Router();

flwRoutes
    .route('/newcompany')
    .post(newCompany)
    .get(getTestFLW)

flwRoutes
    .route('/checkcnpj/:id')
    .get(getCnpjCompany)


export default flwRoutes;
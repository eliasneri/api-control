import express, { Request, Response } from 'express';
import {getCheckCompany} from "../core/controller/crmController";

const crmRoutes = express.Router();

crmRoutes
    .route('/check/:id')
    .get(getCheckCompany);


export default crmRoutes;
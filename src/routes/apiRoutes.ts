import express from 'express';
import {getHealtCheck} from "../core/controller/apiController";

const apiRoutes = express.Router();

apiRoutes
    .route('/hc')
    .get(getHealtCheck)

export default apiRoutes;
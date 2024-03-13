import { Router } from "express";
import { check } from 'express-validator';

import { login } from "../controllers/auth-controller.js";
import { validateFields } from "../middlewares/validate-fields.js";


const routerAuth = Router();

routerAuth.post('/login',[
    check('email', 'Email required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    validateFields
], login)

export {
    routerAuth
}
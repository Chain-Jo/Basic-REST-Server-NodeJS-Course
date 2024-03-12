import { Router } from "express";
import { check } from 'express-validator';



import {validateFields} from '../middlewares/validate-fields.js';
import { ifEmailExist, ifUserByIdExist, isRoleValid } from "../helpers/db-validators.js";

import { 
    usersDelete, 
    usersGet, 
    usersPatch, 
    usersPost, 
    usersPut 
} from "../controllers/users-controller.js";

const router = Router();

router.get('/', usersGet)

router.put('/:id', [
    // check('id', 'Not a valid ID.').isMongoId(),
    check('id').custom(ifUserByIdExist),
    check('role').custom((role) => isRoleValid(role)),
    validateFields,
], usersPut)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 caractéres').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(ifEmailExist),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom((role) => isRoleValid(role)),
    validateFields,
], usersPost)

router.delete('/:id', [
    check('id', 'Not a valid ID.').isMongoId(),
    check('id').custom(ifUserByIdExist),
    validateFields,
],usersDelete)

router.patch('/', usersPatch)

export {
    router
}
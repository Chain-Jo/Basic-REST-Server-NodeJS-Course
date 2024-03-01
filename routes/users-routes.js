import { Router } from "express";
import { 
    usersDelete, 
    usersGet, 
    usersPatch, 
    usersPost, 
    usersPut 
} from "../controllers/users-controller.js";

const router = Router();

router.get('/', usersGet)

router.put('/:userID', usersPut)

router.post('/', usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)

export {
    router
}
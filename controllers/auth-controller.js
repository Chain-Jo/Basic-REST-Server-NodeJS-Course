import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user-models.js';
import { generateJWT } from '../helpers/generate-jwt.js';



const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid email or password - email'
            })
        }

        // Verificar si el usuario está activo
        if (user.status === false) {
            return res.status(400).json({
                msg: 'Invalid email or password - status: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) { 
            return res.status(400).json({
                msg: 'Invalid email or password - password'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id);



        res.json({
            msg: 'Login ok',
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something is worng, contact the admin. '
        })
    }




}

export {
    login,
}
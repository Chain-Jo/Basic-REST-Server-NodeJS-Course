import { request } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user-models.js';


const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    const secretKey = process.env.SECRETORPRIVATEKEY;



    if (!token) {
        return res.status(401).json({
            msg: 'No token', 
        })
    }

    try {
        const {uid} = jwt.verify(token, secretKey);

        // Leer el usuario que corresponda al uid
        const user = await User.findById(uid);     
        
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valid - user no exist',
            })
        }



        // verificar si el uid tiene el estado true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valid - status: false'
            })
            
        }
        

        req.user = user;
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No valid Token'
        })
    }

    // console.log(token);
}




export{
    validateJWT
}
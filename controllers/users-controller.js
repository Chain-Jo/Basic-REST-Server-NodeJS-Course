import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user-models.js';

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

const usersGet = async(req = request, res = response) => {

    const { limit = 4, from = 0} = req.query;
    const query = {status: true}

    // const users = await User.find(query)
    // .skip(Number(from))
    // .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    })
}

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

const usersPost = async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});


    // encriptar contraseña
    const salt = bcryptjs.genSaltSync(16);
    user.password = bcryptjs.hashSync(password, salt);

    // Save on DB
    await user.save();

    res.status(201).json({
        // msg: 'post API - Controller',
        user
    })
}

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

const usersPut = async(req, res = response) => {

    const {id} = req.params;

    const {_id, password, google, email, ...remaining} = req.body;

    // TODO validar contra base de datos
    if (password) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        remaining.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await User.findByIdAndUpdate( id, remaining, {new: true} );

    res.json({
        userDB,
    })
}

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    // const uid = req.uid;

    // Borrar físicamente
    //! No hacer
    // const user = await User.findByIdAndDelete( userID);

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        // msg: 'delete API - Controller',
        user,
    })
}

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

const usersPatch = (req, res = response) => {
    res.json({
        // ok: true,
        msg: 'patch API - Controller'
    })
}

/**
 * ===========================================================================================================
 * ===========================================================================================================
 */

export{
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}
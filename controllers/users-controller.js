import { request, response } from 'express';


const usersGet = (req = request, res = response) => {

    const {query, nombre = 'No name', apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API - Controller',
        query,
        nombre,
        apikey, 
        page,
        limit
    })
}

const usersPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.status(201).json({
        // ok: true,
        msg: 'post API - Controller',
        nombre,
        edad
    })
}

const usersPut = (req, res = response) => {

    // const id = req.params.userID;
    const {userID} = req.params;

    res.json({
        // ok: true,
        msg: 'put API - Controller',
        userID
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        // ok: true,
        msg: 'delete API - Controller'
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        // ok: true,
        msg: 'patch API - Controller'
    })
}



export{
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}
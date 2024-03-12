import Role from '../models/role.js';
import User from '../models/user-models.js';
import mongoose from 'mongoose';






const isRoleValid = async(role = '')  => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no está registrado en la Base de Datos.`);
    }
}


// verificar si correo existe
const ifEmailExist = async(email = '')  => {
    const emailExist = await User.findOne({email});
        if (emailExist) {
            throw new Error(`The email ${email} is already in use.`);
        }
}


// verificar si el id ya existe
const ifUserByIdExist = async(id)  => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const userExist = await User.findById(id);
        if (!userExist) {
            throw new Error(`ID ${id} does not exist.`);
        } 
        
    } else {
        throw new Error(`ID ${id} is not valid.`);
    }


}


export {
    isRoleValid,
    ifEmailExist,
    ifUserByIdExist,
}
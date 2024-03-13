import { response } from "express";

const isAdminRole = (req, res = response, next) => {
    
    if (!req.user) {
        return res.status(500).json({
            msg: 'Cannot verify user role without first validating the Token'
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an Admin `
        });
    }

    next()
}



const haveRole = (...roles) => {
    return (req, res = response, next) => {
        // console.log(roles, req.user.role);

        if (!req.user) {
            return res.status(500).json({
                msg: 'Cannot verify user role without first validating the Token'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `One of the following roles is required: ${roles}`
            });
        }

        next();
    }
}


export {
    isAdminRole,
    haveRole,
}
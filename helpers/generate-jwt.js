import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => {
    const secretKey = process.env.SECRETORPRIVATEKEY;
    return new Promise((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, secretKey, {
            expiresIn:'48h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('Token could not be generated')
            } else {
                resolve(token);
            }
        })


    })
}

export {
    generateJWT
}
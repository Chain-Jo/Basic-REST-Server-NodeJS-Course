import mongoose from 'mongoose';

const mongoDBConnection = process.env.MONGODB_ATLAS_CONNECTION;

const dbConnection = async() => {
    try {
        await mongoose.connect(mongoDBConnection, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
       });

       console.log('Database Online :3');
       

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }
}

export {
    dbConnection
}
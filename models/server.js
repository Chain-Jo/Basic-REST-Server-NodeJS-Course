import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {router} from '../routes/users-routes.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares
        this.middlewares();

        // Routes of my applicaction
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.usersPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutandose en el puerto ${this.port}`);
        })
    }
}







export {
    Server,
}
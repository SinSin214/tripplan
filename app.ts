import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './api/routes/routes';
import * as database from './api/config/database';
dotenv.config();

initApp();

async function initApp() {
	// init a database pool whenever start app
	await database.provideDbPool();
    const app = express();
	const port = process.env.PORT || 3001;

	// apply middlewares
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/post', router);

    
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World From the Typescript Server!')
    });

    app.listen(port);
}
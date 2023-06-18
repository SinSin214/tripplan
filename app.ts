import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRouter from './api/routes/post-route';
import authRouter from './api/routes/auth-route';
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

    app.use('/post', postRouter);
    app.use('/auth', authRouter);

    
    app.get('/', (req, res) => {
      res.send('Hello World From the Typescript Server!')
    });

    app.listen(port);
}
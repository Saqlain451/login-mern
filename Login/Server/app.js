import express from 'express';
import router from './Router/routes.js'
import mongoConnect from './Db/Connect.js';
import * as dotenv from 'dotenv'
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(router)


const port = process.env.PORT; 
app.listen(port,()=>{
    console.log(`Server is ready to go`);
})
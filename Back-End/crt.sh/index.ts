import 'dotenv/config'
import express from "express";
import cors from "cors";
import dataSource from "./db/dataSources.js"
import SubscribersRouter from './router/Subscribers.js'
import DataRouter from './router/Data.js'
import wakeUp from './utils/cronEveryTimeServerRestart.js';


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
app.use('/data', DataRouter)
app.use('/subscribe', SubscribersRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    dataSource
        .initialize()
        .then(() => {
            console.log("connected to DB");
            wakeUp()
        })
        .catch((error) => {
            console.log("error: ", error);
        });
});
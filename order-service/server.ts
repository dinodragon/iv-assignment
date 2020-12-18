import express from 'express';
import Order from './models/order';
import { Sequelize } from 'sequelize-typescript';
import orders from './routes/orders';
import cors from "cors";

// Create a new express app instance
const app: express.Application = express();
const uri: string = process.env.DB_URI || "";

(async () => {
  const sequelize = new Sequelize(uri, { models: [__dirname + '/models'] });
  sequelize.addModels([Order])
  await sequelize.sync();

  app.use(cors())

  app.use(express.json());

  app.use('/orders', orders);

  app.listen(8080, '0.0.0.0', function () {
    console.log('App is listening on port 8080');
  });  
})()

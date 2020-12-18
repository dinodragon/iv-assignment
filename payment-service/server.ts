import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import Payment from './models/payment';
import payments from './routers/payments';

// Create a new express app instance
const app: express.Application = express();
const uri: string = process.env.DB_URI || "";

(async () => {
  const sequelize = new Sequelize(uri, { models: [__dirname + '/models'] });
  sequelize.addModels([Payment])
  await sequelize.sync();

  app.use(express.json());

  app.use('/payments', payments);

  app.listen(8081, '0.0.0.0', function () {
    console.log('App is listening on port 8080');
  });  
})()

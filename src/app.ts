import express from 'express';
import carRoute from './routes/carsRoute';

const app = express();
app.use(express.json());
app.use('/cars', carRoute);

export default app;

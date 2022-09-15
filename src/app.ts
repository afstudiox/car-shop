import express from 'express';
import 'express-async-errors';
import errorhandlerMiddleware from './middlewares/ErrorHandler';
import carRoute from './routes/carsRoute';

const app = express();
app.use(express.json());
app.use('/cars', carRoute);
app.use(errorhandlerMiddleware);

export default app;

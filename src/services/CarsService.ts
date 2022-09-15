import { ICar, ICarZodSchema } from '../interfaces/ICar';
import MongoService from './MongoService';
import { IModel } from '../interfaces/IModel';

class CarService extends MongoService<ICar> {
  constructor(_model:IModel<ICar>, _zodSchema = ICarZodSchema) {
    super(_model);
  }
}

export default CarService;
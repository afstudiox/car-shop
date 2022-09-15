import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean || undefined,
  model: String,
  year: Boolean,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarsModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carMongooseSchema)) {
    super(model);
  }
}

export default CarsModel;
import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import NewError from '../middlewares/NewError';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }
  
  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }
  
  public async read(): Promise<T[] | null> {
    return this._model.find();
  }
  
  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new NewError('InvalidMongoId', 'InvalidMongoId');
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new NewError('InvalidMongoId', 'InvalidMongoId');
    const updated = await this._model.findByIdAndUpdate({ _id, ...obj });
    return updated;
  }

  public async delete(_id:string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new NewError('InvalidMongoId', 'InvalidMongoId');
    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
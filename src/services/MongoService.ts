import { ICarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

abstract class MongoService<T> implements IService<T> {
  constructor(protected _model:IModel<T>, protected _zodSchema = ICarZodSchema) { }
  
  public async create(obj:T):Promise<T> {
    const parse = this._zodSchema.safeParse(obj);
    if (!parse.success) {
      throw parse.error;
    }
    const created = await this._model.create(obj);
    return created;
  }
  
  public async read():Promise<T[] | null> {
    const readCars = await this._model.read();
    return readCars;
  }
  
  public async readOne(_id:string):Promise<T | null> {
    const readCar = this._model.readOne(_id);
    if (!readCar) throw Error();
    return readCar;
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    const carUpdated = this._model.update(_id, obj);
    if (!carUpdated) throw Error();
    return carUpdated;
  }

  public async delete(_id:string): Promise<T | null> {
    const carDeleted = this._model.delete(_id);
    if (!carDeleted) throw Error();
    return carDeleted;
  }
}

export default MongoService;
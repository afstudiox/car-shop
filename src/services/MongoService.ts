import { ICarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import NewError from '../middlewares/NewError';

abstract class MongoService<T> implements IService<T> {
  constructor(protected _model:IModel<T>, protected _zodSchema = ICarZodSchema) { }
  msg = 'Object not found';

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
    const readCar = await this._model.readOne(_id);
    if (!readCar) throw new NewError('EntityNotFound', this.msg);
    return readCar;
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    const parsed = this._zodSchema.safeParse(obj);
    if (!parsed.success) throw new NewError('ValidationError', this.msg);

    const carUpdated = await this._model.update(_id, obj);
    if (!carUpdated) throw new NewError('EntityNotFound', this.msg);
    return carUpdated;
  }

  public async delete(_id:string): Promise<T | null> {
    const carDeleted = await this._model.delete(_id);
    if (!carDeleted) throw new NewError('EntityNotFound', this.msg);
    return carDeleted;
  }
}

export default MongoService;
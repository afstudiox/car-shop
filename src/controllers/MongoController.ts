import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';

export default abstract class MongoController<T> {
  constructor(protected _service: IService<T>) {}

  public async create(req:Request, res:Response<T>) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }
  
  public async read(req:Request, res:Response<T[] | null>) {
    const readCars = await this._service.read();
    return res.status(200).json(readCars);
  }

  public async readOne(req:Request, res:Response<T | null>) {
    const readCar = await this._service.readOne(req.params.id);
    return res.status(200).json(readCar);
  }

  public async update(req:Request, res:Response<T | null>) {
    const carUpdated = await this._service.update(req.params.id, req.body.body);
    return res.status(200).json(carUpdated);
  }

  public async delete(req:Request, res:Response<T | null>) {
    const carDeleted = await this._service.delete(req.params.id);
    return res.status(204).json(carDeleted);
  }
}
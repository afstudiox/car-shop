import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import CarsModel from '../../../models/CarsModel';
import CarService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { carMock, carMockForUpdate, carMockUpdatedWithId, carMockWithId } from '../../mocks/carMocks';

describe('Car Controller', () => {
  const carModel = new CarsModel();
  const carService = new CarService(carModel);
  const carController = new CarsController(carService);
  const req = {} as Request;
  const res = {} as Response;
  // const next = (sinon.stub() as unknown) as NextFunction; 
  //   não vamos usar mas poderíamos dublá-lo assim 
  //   testá-lo assim: expect((next as sinon.SinonStub).calledWith(fakeError)).to.be.true;
  
  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);
    sinon.stub(carService, 'update').resolves(carMockUpdatedWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating car', () => {
    it('success ', async () => {
      req.body = carMock;
      await carController.create(req,res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true; 
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('searching a car', () => {
    it('success ', async () => {
      req.params = { id: 'a validação é feita na model, estão tanto faz aqui' }
      await carController.readOne(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true; 
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('list all cars', () => {
    it('success ', async () => {
      await carController.read(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true; 
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('update a car', () => {
    it('success ', async () => {
      req.params = { id: 'a validação é feita na model, estão tanto faz aqui' };
      req.body = carMockForUpdate;
      await carController.update(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true; 
      expect((res.json as sinon.SinonStub).calledWith(carMockUpdatedWithId)).to.be.true;
    });
  });

  describe('delete a car', () => {
    it('success ', async () => {
      req.params = { id: 'a validação é feita na model, estão tanto faz aqui' };
      await carController.delete(req,res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true; 
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  

});
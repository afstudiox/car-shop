import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarsService';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockForUpdate, carMockInvalid, carMockUpdatedWithId, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarsModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'update').resolves(carMockUpdatedWithId);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('success ', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId); 
    });
  });

  describe('searchin a car', () => {
    it('success', async () => {
      const car = await carService.readOne('6323641b3bd18401fb821e47');
      expect(car).to.be.equal(carMockWithId); 
    });    
  });

  describe('list all cars', () => {
    it('success', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMockWithId]); 
    });    
  });

  describe('update a car', () => {
    it('success', async () => {
      const carUpdate = await carService.update('6323641b3bd18401fb821e47', carMockForUpdate);
      expect(carUpdate).to.be.deep.equal(carMockUpdatedWithId); 
    });    
  });

  describe('delete a car', () => {
    it('success', async () => {
      const carDeleted = await carService.delete('6323641b3bd18401fb821e47');
      expect(carDeleted).to.be.deep.equal(carMockWithId); 
    });    
  });

});
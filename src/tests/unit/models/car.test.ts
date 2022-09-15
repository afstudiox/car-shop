import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { Model } from 'mongoose';
import { carMockWithId, carMockUpdatedWithId, carMock, carMockForUpdate } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarsModel(); 

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdatedWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('sucessfully created', async () => { 
      const newCar = await carModel.create(carMock); 
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searchin a car', () => {
    it('sucessfully found car', async () => { 
      const car = await carModel.readOne('6323641b3bd18401fb821e47'); 
      expect(car).to.be.equal(carMockWithId);
    });
    it('_id not found', async () => { 
     try {
        await carModel.readOne('123ERRADO');
     } catch (error: any) {
        expect(error.name).to.be.eq('InvalidMongoId')
     }
    });
  });

  describe('searchin all cars', () => {
    it('sucessfully listed', async () => { 
      const carList = await carModel.read(); 
      expect(carList).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('update a car', () => {
    it('sucessfully update car', async () => { 
      const carUpdate = await carModel
        .update('6323641b3bd18401fb821e47', carMockForUpdate) 
      expect(carUpdate).to.be.deep.equal(carMockUpdatedWithId);
    });
    it('_id not found', async () => { 
     try {
        await carModel.update('123ERRADO', carMockForUpdate);
     } catch (error: any) {
        expect(error.name).to.be.eq('InvalidMongoId')
     }
    });
  });

  describe('delete a car', () => {
    it('sucessfully delete car', async () => { 
      const carDeleted = await carModel.delete('6323641b3bd18401fb821e47') 
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });
    it('_id not found', async () => { 
     try {
        await carModel.delete(`123ERRADO`);
     } catch (error: any) {
        expect(error.name).to.be.eq('InvalidMongoId')
     }
    });
  });

})
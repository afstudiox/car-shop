import { ICar } from "../../interfaces/ICar"

const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

const carMockWithId: ICar & {_id: string } = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  _id: '6323641b3bd18401fb821e47'
}

const carMockUpdatedWithId: ICar & {_id: string } = {
  model: 'Fiat Uno',
  year: 1993,
  color: 'white',
  buyValue: 5500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '6323641b3bd18401fb821e47'
}

const carMockForUpdate: ICar = {
  model: 'Fiat Uno',
  year: 1993,
  color: 'white',
  buyValue: 5500,
  seatsQty: 2,
  doorsQty: 2,
}

const carMockInvalid: ICar & {invalid: true }= {
  model: 'Fiat Uno',
  year: 1993,
  color: 'white',
  buyValue: 5500,
  seatsQty: 2,
  doorsQty: 2,
  invalid: true
}

export { carMockInvalid, carMockForUpdate, carMockUpdatedWithId, carMockWithId, carMock };
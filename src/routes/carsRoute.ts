import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const carModel = new CarsModel();
const carService = new CarsService(carModel); 
const carController = new CarsController(carService);

const carRoute = Router();

carRoute.post('/', (req, res) => carController.create(req, res));
carRoute.get('/', (req, res) => carController.read(req, res));
carRoute.get('/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/:id', (req, res) => carController.update(req, res));
carRoute.delete('/:id', (req, res) => carController.delete(req, res));

export default carRoute;
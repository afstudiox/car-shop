import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';

const ICarZodSchema = IVehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4).int(),
  seatsQty: z.number().min(2).max(7).int() });

type ICar = z.infer<typeof ICarZodSchema>;

export { ICarZodSchema, ICar };
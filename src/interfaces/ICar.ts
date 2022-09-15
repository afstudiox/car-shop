import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';

const ICarZodSchema = IVehicleZodSchema.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7) });

type ICar = z.infer<typeof ICarZodSchema>;

export { ICarZodSchema, ICar };
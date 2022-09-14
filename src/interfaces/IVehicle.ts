import { z } from 'zod';

const IVehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022).int(),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int() });

type IVehicle = z.infer<typeof IVehicleZodSchema>;

export { IVehicleZodSchema, IVehicle };
import { NextFunction, Request, Response } from 'express';

const errors: { [errorName: string]: number } = {
  ValidationError: 400,
  ZodError: 400,
  InvalidMongoId: 400,
  EntityNotFound: 404,
};

const errorhandlerMiddleware = (
  err: Error,
  _req:Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[err.name];
  // console.log(status);
  // console.log(err.name);
  // console.log(err);
  // if (!status) return res.sendStatus(500);
  res.status(status || 500).json({ error: err.message });
};

export default errorhandlerMiddleware;
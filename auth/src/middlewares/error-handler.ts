
// import { Request, Response, NextFunction } from "express";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//     console.log('sdfsdfs', err);
//     res.status(400).send({
//         message: err.message
//     });
// };
// import { Request, Response, NextFunction } from "express";
// import {CustomError} from '../errors/custom-error'
// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//  if (err instanceof CustomError){
//     return res.status(err.statusCode).send({errors: err.serializeErrors()});
//  }

//   res.status(400).send({
//     message: [{message: 'Something went wrong'}]
//   });
// };
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    res.status(400).send({ message: 'Something went wrong' });
  }
  next();
};
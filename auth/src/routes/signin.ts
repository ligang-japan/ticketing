// import jwt from 'jsonwebtoken';
// import { BadRequestError } from './../errors/bad-request-error';
// import { validateRequest } from './../middlewares/validate-request';

// import express, {Request, Response} from 'express';
// import {body} from 'express-validator';
// import {User} from '../models/user';
// import {Password} from '../services/password';

// const router = express.Router();
// // router.post(
// //     "/api/users/signup",
// router.post('/api/users/signin', 
// [
//    body('email')
//      .isEmail()
//      .withMessage('Email must be valid'),
//      body('password') 
//        .trim()
//        .notEmpty()
//        .withMessage('You must supply a password'),
// ],
// validateRequest,
// async (req: Request, res:Response)=>{
//   const {email, password}=req.body;
//   console.log(email);
//   const existingUser = await User.findOne({email});
//   if (!existingUser){
//       console.log('test');
// throw new BadRequestError('Invalid credentials');
//   }
//   const passwordMatch= await Password.compare(
//       existingUser.password,
//       password
// );
// if(!passwordMatch){
//     throw new BadRequestError('Invalid Credentials');
// }
// const userJWT = jwt.sign(
//     {
//     id: existingUser.id,
//     email: existingUser.email
//   }, 
//   process.env.JWT_KEY!);

//   req.session={
//     jwt:userJWT,
//   };
// res.status(200).send(existingUser);
// }
// );
// export {router as signinRouter};
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
        console.log('show error');
      throw new BadRequestError('Invalid sdf credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
        console.log('show password error');
      throw new BadRequestError('Invalid sdfd Credentials');
    }
    console.log('show error');
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };

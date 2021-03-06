import "express-async-errors";
import mongoose from "mongoose";
import {app} from "./app";
const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY not defined');
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log('Connected to mongoDatabase');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!updated");
  });
};
start();
// import express from "express";
// import { json } from "body-parser";

// import { currentUserRouter } from "./routes/current-user";
// import { signinRouter } from "./routes/signin";
// import { signoutRouter } from "./routes/signout";
// import { signupRouter } from "./routes/signup";
// import { errorHandler } from "./middlewares/error-handler";

// const app = express();
// //app.use(json());
// app.use(express.json());
// app.use(errorHandler);
// app.use(currentUserRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

// app.listen(3000, () => {
//   console.log("Listening on port 3000 ch");
// });

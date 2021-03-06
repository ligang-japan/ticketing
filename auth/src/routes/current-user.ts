import { currentUser } from './../middlewares/current-user';
import express from "express";
import {requireAuth} from '../middlewares/require-auth';

const router = express.Router();
router.get("/api/users/currentuser",currentUser,requireAuth, (req, res) => {

res.send({currentUser: req.currentUser || null});
  
});

export { router as currentUserRouter };

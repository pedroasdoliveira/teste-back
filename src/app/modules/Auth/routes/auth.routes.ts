import { Router } from 'express';
import { Request, Response } from 'express';
import UserController from '../../Users/controllers/ControllerUser';
import SessionController from '../controllers/ControllerSession';
import VerifyJWT from '../middleware/verifyJWT';

const authRoutes = Router();
const userController = new UserController();
const sessionController = new SessionController();

authRoutes.post('/signup', userController.store);

authRoutes.get('/users', VerifyJWT, userController.show);

authRoutes.post('/login', sessionController.store);

export default authRoutes;

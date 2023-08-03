import { Router } from 'express';
import VerifyJWT from '../middlewares/verifyJWT';
import TaskController from '../../modules/controllers/ControllerTask';

const taskRoute = Router();
const taskController = new TaskController();

taskRoute.post('/', VerifyJWT, taskController.store);

export default taskRoute;

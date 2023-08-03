import { Router } from 'express';
import VerifyJWT from '../../Auth/middleware/verifyJWT';
import TaskController from '../controllers/ControllerTask';

const taskRoute = Router();
const taskController = new TaskController();

taskRoute.post('/', VerifyJWT, taskController.store);

export default taskRoute;

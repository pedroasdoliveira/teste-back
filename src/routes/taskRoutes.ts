import { Router } from "express";
import VerifyJWT from "../app/middlewares/verifyJWT";
import TaskController from '../app/controllers/ControllerTask';

const taskRoute = Router();
const taskController = new TaskController();

taskRoute.post('/task', VerifyJWT, taskController.store);

export default taskRoute;
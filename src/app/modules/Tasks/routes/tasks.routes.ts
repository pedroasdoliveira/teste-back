import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import VerifyJWT from '../../Auth/middleware/verifyJWT';
import TaskController from '../controllers/ControllerTask';

const taskRoute = Router();
const taskController = new TaskController();

taskRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      task: Joi.string().required(),
      priority: Joi.string().required(),
      date_deadline: Joi.string().required(),
      time_deadline: Joi.string().required(),
      completed: Joi.boolean().required(),
      organization: Joi.string().required(),
    },
  }),
  VerifyJWT,
  taskController.store,
);

export default taskRoute;

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '../controllers/ControllerSession';

const authRoutes = Router();
const sessionController = new SessionController();

authRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.store,
);

export default authRoutes;

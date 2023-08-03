import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '../controllers/ControllerUser';
import VerifyJWT from '@modules/Auth/middleware/verifyJWT';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.get('/', VerifyJWT, userController.show);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.store,
);

export default usersRoutes;

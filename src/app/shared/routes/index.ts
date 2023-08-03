import { Router } from 'express';

import authRoutes from '../../modules/Auth/routes/auth.routes';
import taskRoute from '../../modules/Tasks/routes/tasks.routes';
import usersRoutes from '@modules/Users/routes/users.routes';

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/users', usersRoutes);

routes.use('/tasks', taskRoute);

export default routes;

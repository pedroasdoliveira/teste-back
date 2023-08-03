import { Router } from "express";
import authRoutes from "./authRoutes";
import taskRoute from "./taskRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use('/tasks', taskRoute);

export default routes;
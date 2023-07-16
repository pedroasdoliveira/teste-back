import { Router } from "express";
import { Request, Response } from "express";
import UserController from '../app/controllers/ControllerUser';
import SessionController from "../app/controllers/ControllerSession";
import VerifyJWT from "../app/middlewares/verifyJWT";

const authRoutes = Router();
const userController = new UserController();
const sessionController = new SessionController();

authRoutes.get("/", (req: Request, res: Response) => {
    res.send('Hello');
});

authRoutes.post('/signup', userController.store);

authRoutes.get("/users", VerifyJWT, userController.show);

authRoutes.post('/login', sessionController.store);

export default authRoutes;
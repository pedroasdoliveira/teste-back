import { Router } from "express";
import { Request, Response } from "express";

const authRoutes = Router();

authRoutes.get("/", (req: Request, res: Response) => {
    res.send('Hello');
});

export default authRoutes;
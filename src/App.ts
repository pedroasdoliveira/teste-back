import './app/bootstrap';
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import routes from "./routes";
import cookieParser from 'cookie-parser';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
      }),
    );
    this.app.use(compression());
    this.app.use(express.json({ limit: "600mb" }));
    this.app.use(cookieParser());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH",
      );
      res.header("Access-Control-Allow-Headers", `${process.env.FRONTEND_URL}`);
      next();
    });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes() {
    this.app.use(routes);
  }
}

export default App;

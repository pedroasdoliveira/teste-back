import '../app/config/bootstrap';

import 'express-async-errors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { errors } from 'celebrate';

import RequestsHeader from '@shared/middlewares/RequestsHeader';
import routes from '../app/shared/routes';

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
    this.app.use(express.json({ limit: '600mb' }));
    this.app.use(cookieParser());

    this.app.use(RequestsHeader);

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use(routes);
    this.app.use(errors());
  }
}

export default App;

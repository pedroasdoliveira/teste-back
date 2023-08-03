import { Sequelize } from 'sequelize-typescript';

import Users from '../modules/Users/model/Users';
import Tasks from '../modules/models/Tasks';
import TaskPoints from '../modules/models/TaskPoints';

const dbConfig = require('../config/database');

class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(dbConfig);
    this.initModels();
  }

  private initModels(): void {
    this.sequelize.addModels([Users, TaskPoints, Tasks]);
  }

  public getInstance(): Sequelize {
    return this.sequelize;
  }
}

const database = new Database();

export default database.getInstance();

import { Sequelize } from "sequelize-typescript";
import Users from "app/models/Users";

const dbConfig = require("../config/database");

class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(dbConfig);
    this.initModels();
  }

  private initModels(): void {
    this.sequelize.addModels([Users]);
  }

  public getInstance(): Sequelize {
    return this.sequelize;
  }
}

const database = new Database();

export default database.getInstance();

import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";

@Table({
  tableName: "Users",
  timestamps: true,
})
class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column(DataType.STRING)
  passwordHash: string;

  @Column(DataType.STRING)
  tokenHash: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (user: Users): Promise<void> => {
    if (user.passwordHash) {
      user.passwordHash = await hash(user.password, 8);
    }
    console.log(user.passwordHash);
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    const teste = await hash(password, 8);
    console.log("newHash", teste);
    console.log("databaseHash", this.getDataValue("passwordHash"));
    console.log("teste", teste == this.getDataValue("passwordHash"));

    return compare(password, this.getDataValue("passwordHash"));
  };
}

export default Users;

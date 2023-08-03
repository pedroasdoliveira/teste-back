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
  HasMany,
} from "sequelize-typescript";
import TaskPoints from "./TaskPoints";

@Table({
  tableName: "Tasks",
  timestamps: true,
})
class Tasks extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  task: string;

  @Column(DataType.STRING)
  priority: string;

  @Column(DataType.STRING)
  date_deadline: string;

  @Column(DataType.STRING)
  time_deadline: string;

  @Column(DataType.BOOLEAN)
  completed: boolean;

  @Column(DataType.STRING)
  organization: string;

  @Column(DataType.ARRAY(DataType.STRING))
  invited: string[];

  @HasMany(() => TaskPoints)
  taskPoints: TaskPoints[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default Tasks;

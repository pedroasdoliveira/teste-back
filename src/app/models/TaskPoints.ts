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
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Tasks from "./Tasks";

@Table({
  tableName: "TaskPoints",
  timestamps: true,
})
class TaskPoints extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  points: string;

  @Column(DataType.BOOLEAN)
  makeTask: boolean;

  @ForeignKey(() => Tasks)
  @Column
  tasksId: number;

  @BelongsTo(() => Tasks)
  tasks: Tasks;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default TaskPoints;

import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: 'Organizations',
  timestamps: true,
})
class Organizations extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  logo: string;

  @Column(DataType.STRING)
  leader: string;

  @Column(DataType.ARRAY(DataType.STRING))
  members: string[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default Organizations;
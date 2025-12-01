import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Candidate } from "./Candidate";
import { ExperienceType } from "../types/UserTypes";

@Table({
  timestamps: true,
  tableName: "experiences",
})
export class Experience extends Model<ExperienceType> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  company!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Column(DataType.DATE)
  startDate!: Date;

  @Column(DataType.DATE)
  endDate!: Date;

  @ForeignKey(() => Candidate)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => Candidate)
  user!: Candidate;
}

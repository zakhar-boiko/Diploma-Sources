import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";
import { UUID } from "crypto";
import { Gig } from "./Gig";

@Table({
  timestamps: true,
  tableName: "recruiters",
})
export class Recruiter extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: UUID;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @Column(DataType.STRING)
  businessArea!: string;

  @Column(DataType.STRING)
  company!: string;

  @Column(DataType.STRING)
  location!: string;

  @Column(DataType.INTEGER)
  numberOfEmployees!: number;

  @HasMany(() => Gig)
  postedGigs!: Gig[];
}

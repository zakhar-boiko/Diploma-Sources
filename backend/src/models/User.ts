import { UUID } from "crypto";
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  Default,
  BelongsTo,
  HasOne,
  HasMany,
  Max,
} from "sequelize-typescript";
import { Recruiter } from "./Recruiter";
import { Candidate } from "./Candidate";
import { Experience } from "./Experience";
import { Language } from "./Language";
import { AccountType } from "../types/enums/UserEnums";

@Table({
  timestamps: true,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: UUID;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING(2000))
  avatarUrl!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  personalLinks!: string;

  @Column(DataType.STRING(2000))
  description!: string;

  @Column(DataType.STRING)
  introduction!: string;

  @Column(
    DataType.ENUM({
      values: ["CONSULTANT", "CLIENT"],
    })
  )
  accountType!: AccountType;

  @Column(DataType.STRING)
  mobileNumber!: string;

  @HasOne(() => Candidate, {
    onDelete: "CASCADE",
  })
  consultant!: Candidate;

  @HasOne(() => Recruiter, {
    onDelete: "CASCADE",
  })
  client!: Recruiter;
}

export default User;

// @Column(DataType.JSON)
// suitableGigs!: any;

// @Column(DataType.STRING)
// suitabilityPercentage!: string;

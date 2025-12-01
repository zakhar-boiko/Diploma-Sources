import {
  Model,
  Column,
  DataType,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { UserSkillType } from "../types/UserTypes";
import { Candidate } from "./Candidate";
import { Skill } from "./Skill";

@Table({
  timestamps: true,
  tableName: "user_skills",
})
export class UserSkill extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Candidate)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  skillId!: string;

  @BelongsTo(() => Candidate)
  user!: Candidate;

  @BelongsTo(() => Skill)
  skill!: Skill;
}

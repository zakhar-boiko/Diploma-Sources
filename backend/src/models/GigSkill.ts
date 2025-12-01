import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { Candidate } from "./Candidate";
import { Skill } from "./Skill";
import { GigSkillType } from "../types/GigTypes";
import { Gig } from "./Gig";

@Table({
  timestamps: true,
  tableName: "gig_skills",
})
export class GigSkill extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Gig)
  @Column({
    type: DataType.UUID,
  })
  gigId!: string;

  @BelongsTo(() => Gig)
  gig!: Gig;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.UUID,
  })
  skillId!: string;

  @BelongsTo(() => Skill)
  skill!: Skill;
}

import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { SkillCategory } from "../types/enums/UserEnums";
import { SkillType } from "../types/UserTypes";
import { UserSkill } from "./UserSkill";
import { GigSkill } from "./GigSkill";

@Table({
  timestamps: true,
  tableName: "skills",
})
export class Skill extends Model<SkillType> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(
    DataType.ENUM({ values: ["EXPERTISE", "ROLES", "METHODS_AND_TOOLS"] })
  )
  categoryName!: SkillCategory;
}

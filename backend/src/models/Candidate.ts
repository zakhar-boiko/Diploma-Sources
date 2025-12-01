import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";
import { UUID } from "crypto";
import { Experience } from "./Experience";
import { ProfileLevel } from "../types/enums/UserEnums";
import { UserSkill } from "./UserSkill";
import { UserSuitability } from "./UserSuitability";
import { UserLanguage } from "./UserLanguage";
import { ConsultantType } from "../types/UserTypes";

@Table({
  timestamps: true,
  tableName: "candidates",
})
export class Candidate extends Model {
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

  @Column(DataType.ARRAY(DataType.DECIMAL))
  skillsVector!: number[];

  @Column(DataType.ARRAY(DataType.DECIMAL))
  vector!: number[];

  @Column(DataType.STRING(2000))
  cvUrl!: string;

  @Column(DataType.STRING)
  officePreference!: string;

  @Column(
    DataType.ENUM({
      values: [
        "ENTRY_LEVEL",
        "JUNIOR",
        "MIDDLE",
        "SENIOR",
        "EXPERT",
      ],
    })
  )
  profileLevel!: ProfileLevel;

  @HasMany(() => Experience)
  experiences!: Experience[];

  @HasMany(() => UserSkill)
  skills!: UserSkill[];

  @HasMany(() => UserLanguage)
  languages!: UserLanguage[];

  @HasOne(() => UserSuitability)
  suitability!: UserSuitability;

  @BelongsTo(() => User)
  user!: User;
}

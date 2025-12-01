import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasOne,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { GigSuitability } from "./GigSuitability";
import { Recruiter } from "./Recruiter";
import { ProfileLevel } from "../types/enums/UserEnums";
import { UUID } from "crypto";
import { GigType } from "../types/GigTypes";
import { GigSkill } from "./GigSkill";
import { GigLanguage } from "./GigLanguage";

@Table({
  timestamps: true,
  tableName: "gigs",
})
export class Gig extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Recruiter)
  @Column({
    type: DataType.UUID,
  })
  creatorId!: UUID;

  @BelongsTo(() => Recruiter)
  user!: Recruiter;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

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

  @Column({
    type: DataType.STRING(2000),
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ARRAY(DataType.FLOAT),
  })
  gigVector!: number[];

  @Column({
    type: DataType.DATE,
  })
  publicationDate!: Date;

  @HasOne(() => GigSuitability)
  suitableUserIds!: GigSuitability;

  @HasMany(() => GigSkill)
  skills!: GigSkill[];

  @HasMany(() => GigLanguage)
  languages!: GigLanguage[];
}

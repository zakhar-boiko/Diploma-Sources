import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { Candidate } from "./Candidate";
import { UUID } from "crypto";
import { LanguageType } from "../types/UserTypes";
// import { UserLanguage } from "./UserLanguage";
// import { GigLanguage } from "./GigLanguage";

@Table({
  timestamps: true,
  tableName: "languages",
})
export class Language extends Model<LanguageType> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: UUID;

  @Column(DataType.STRING)
  name!: string;

  // @BelongsTo(() => UserLanguage)
  // userLanguage!: UserLanguage;

  // @BelongsTo(() => UserLanguage)
  // gigLanguage!: GigLanguage;
}

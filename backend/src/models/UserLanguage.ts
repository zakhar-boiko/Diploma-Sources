import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Candidate } from "./Candidate";
import { Language } from "./Language";

@Table({
  timestamps: true,
  tableName: "user_languages",
})
export class UserLanguage extends Model {
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

  @BelongsTo(() => Candidate)
  user!: Candidate;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.UUID,
  })
  languageId!: string;

  @BelongsTo(() => Language)
  language!: Language;
}

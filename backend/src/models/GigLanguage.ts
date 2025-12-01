import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Language } from "./Language";
import { GigLanguageType } from "../types/GigTypes";
import { Gig } from "./Gig";

@Table({
  timestamps: true,
  tableName: "gig_languages",
})
export class GigLanguage extends Model {
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

  @ForeignKey(() => Language)
  @Column({
    type: DataType.UUID,
  })
  languageId!: string;

  @BelongsTo(() => Language)
  language!: Language;
}

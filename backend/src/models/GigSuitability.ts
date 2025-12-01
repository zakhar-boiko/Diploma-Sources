import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { GigSuitableUser } from "./GigSuitableUser";
import { Gig } from "./Gig";
import { Recruiter } from "./Recruiter";

@Table({
  timestamps: true,
  tableName: "gig_suitablity",
})
export class GigSuitability extends Model {
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
  gig!: Gig

  @HasMany(() => GigSuitableUser)
  suitableUsers!: GigSuitableUser[];
}

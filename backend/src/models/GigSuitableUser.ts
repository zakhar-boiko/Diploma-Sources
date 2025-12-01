import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { Candidate } from "./Candidate";
import { GigSuitability } from "./GigSuitability";

@Table({
  timestamps: true,
  tableName: "gig_suitable_users",
})
export class GigSuitableUser extends Model {
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

  @ForeignKey(() => GigSuitability)
  @Column({
    type: DataType.UUID,
  })
  gigSuitabilityId!: string;

  @BelongsTo(() => Candidate)
  user!: Candidate

  @Column(DataType.STRING)
  percentages!: string;
}

import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserSuitability } from "./UserSuitability";
import { Gig } from "./Gig";

@Table({
  timestamps: true,
  tableName: "user_suitable_gigs",
})
export class UserSuitableGigs extends Model {
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

  @ForeignKey(() => UserSuitability)
  @Column({
    type: DataType.UUID,
  })
  userSuitabilityId!: string;

  @Column(DataType.FLOAT)
  percentages!: number;
}

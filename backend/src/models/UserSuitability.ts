import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserSuitableGigs } from "./UserSuitableGigs";
import { Candidate } from "./Candidate";

@Table({
    timestamps: true,
    tableName: "user_suitability",
  })
export class UserSuitability extends Model {
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
  user!: Candidate

  @HasMany(() => UserSuitableGigs)
  suitableJobs!: UserSuitableGigs[];
}

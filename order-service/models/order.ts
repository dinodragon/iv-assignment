import {AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

@Table
export default class Order extends Model<Order>{
  static readonly STATUS_CREATED = 1
  static readonly STATUS_CONFIRM = 2
  static readonly STATUS_CANCELED = 3
  static readonly STATUS_DELIVERED = 4

  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  number!: string;
  
  @Column({ type: DataType.DECIMAL(10, 2) })
  @Column
  amount!: number;
  
  @Column
  status!: number

  @Column
  payment_id?: number
  
  @Column
  completed!: boolean
  
  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
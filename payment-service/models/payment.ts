import {AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

@Table
export default class Payment extends Model<Payment>{
  static readonly STATUS_REJECTED = 0;
  static readonly STATUS_PAID = 1;

  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  number!: string;
  
  @Column({ type: DataType.DECIMAL(10, 2) })
  amount!: number;
  
  @Column
  status!: number

  @Column
  order_id?: number
  
  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
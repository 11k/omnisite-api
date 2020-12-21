import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
} from 'typeorm';

export default abstract class RootEntity extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @Column({ default: true })
  isActive: boolean;
}

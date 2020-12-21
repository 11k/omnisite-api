import { Entity, Column } from 'typeorm';
import { RootEntity } from '.';

@Entity({ name: 'user' })
export default class User extends RootEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLogIn: Date;
}

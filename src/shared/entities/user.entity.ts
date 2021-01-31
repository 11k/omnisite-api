import { Entity, Column } from 'typeorm';

import { RootEntity } from '.';
import { AuthType } from '../enums';

@Entity({ name: 'user' })
export default class User extends RootEntity {
  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column()
  authType: AuthType;

  @Column()
  authId: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLogIn: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccountStatus } from '../enums/account-status.enum';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  phoneNumber?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column()
  gender?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: string;

  @Column({ nullable: true })
  address?: string;

  @Column()
  role: UserRole;

  @Column()
  status: AccountStatus;
}

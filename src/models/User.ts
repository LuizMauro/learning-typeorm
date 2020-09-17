import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('use_users')
class User {
  @PrimaryGeneratedColumn('uuid')
  useID: string;

  @Column()
  useName: string;

  @Column()
  useEmail: string;

  @Column()
  usePasswordHash: string;

  @CreateDateColumn()
  useDateCreated: Date;

  @UpdateDateColumn()
  useDateUpdated: Date;
}

export default User;

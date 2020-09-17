import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany } from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp')
  date: Date;
}

export default Appointment;

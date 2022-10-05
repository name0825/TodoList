import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column('varchar', { length: 16, unique: true })
  id: string;

  @Column('varchar', { length: 128 })
  password: string;

  @Column('varchar', { length: 16, unique: true })
  name: string;
}

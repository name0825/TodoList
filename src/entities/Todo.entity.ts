import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  RelationId,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  seq: number;

  @ManyToOne((type) => User, (user) => user)
  @JoinColumn({ name: 'userSeq' })
  userSeq: number;

  @Column()
  todo: string;

  @Column('boolean', { default: false })
  done: boolean = false;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended: Date;

  @Column({ type: 'timestamp' })
  targetDate: Date;
}

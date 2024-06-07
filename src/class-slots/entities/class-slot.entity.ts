import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  remainingSlots: number;

  @Column()
  startsAt: Date;
}

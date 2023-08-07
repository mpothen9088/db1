import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class truck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  load: number;

  @Column()
  capacity: number;

  @Column()
  year: number;

  @Column()
  numberOfRepairs: number;
}

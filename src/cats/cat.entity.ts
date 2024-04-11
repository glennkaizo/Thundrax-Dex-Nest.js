import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}

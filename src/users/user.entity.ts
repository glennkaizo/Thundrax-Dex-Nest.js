import { Cat } from "src/cats/cat.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @ManyToMany(() => Cat)
  @JoinTable({ name: "favorite_cats" })
  favoriteCats: Cat[];
}

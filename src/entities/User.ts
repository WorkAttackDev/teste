import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  @Field()
  role!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt!: Date;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isVerified!: boolean;

  @Column({ unique: true, nullable: true })
  verifyToken!: string;

  @CreateDateColumn()
  expireToken!: Date;
}

export default User;

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id!: number;

  @Field()
  cid!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  role!: number;

  @Field()
  isVerified!: boolean;
}

export default User;

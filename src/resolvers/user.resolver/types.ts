import { Field, InputType, ObjectType } from "type-graphql";
import User from "../../entities/User";

@ObjectType()
class FieldError {
  @Field()
  field?: string;

  @Field()
  message?: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class HasChangeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  change?: boolean;
}

@InputType()
export class SignUpInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class LogInInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  token!: string;

  @Field()
  password!: string;
}

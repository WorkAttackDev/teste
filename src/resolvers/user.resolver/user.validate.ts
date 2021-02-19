import type { SignUpInput, UserResponse } from "./types";

import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

export const hasPasswordError = (password: string) => {
  if (!isLength(password, { min: 8 }))
    return {
      errors: [
        {
          field: "password",
          message: "A password precisa ter mais de 8 caractéres.",
        },
      ],
    };

  return null;
};

export const hasEmailError = (email: string) => {
  if (!isEmail(email))
    return {
      errors: [{ field: "email", message: "email inválido" }],
    };

  return null;
};

export const signupValidate = ({
  name,
  email,
  password,
}: SignUpInput): UserResponse | null => {
  if (name.length < 3)
    return {
      errors: [
        {
          field: "name",
          message: "O nome precisa ter mais de 3 caractéres.",
        },
      ],
    };

  const emailError = hasPasswordError(email);
  if (emailError) return emailError;

  const passwordError = hasPasswordError(password);
  if (passwordError) return passwordError;

  return null;
};

export const loginValidate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): UserResponse | null => {
  const emailError = hasPasswordError(email);
  if (emailError) return emailError;

  const passwordError = hasPasswordError(password);
  if (passwordError) return passwordError;

  return null;
};

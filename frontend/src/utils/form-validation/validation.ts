import { Dispatch, SetStateAction } from "react";

export interface RegistrationErrors {
  non_field_errors?: string;
  username?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
}

export function validateForm(
  setErrors: Dispatch<SetStateAction<RegistrationErrors>>,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): boolean {
  const errors: RegistrationErrors = {};
  let isError = false;

  if (!username) {
    errors.username = "Username is required";
    isError = true;
  }

  if (!email) {
    errors.email = "Email is required";
    isError = true;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
    isError = true;
  }

  if (!password) {
    errors.password = "Password is required";
    isError = true;
  } else if (password !== confirmPassword) {
    errors.password_confirm = "Passwords do not match";
    isError = true;
  }

  setErrors(errors);
  return isError;
}

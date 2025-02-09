"use client";
import Link from "next/link";
import { useState } from "react";
import GoogleLoginButton from "../components/google-login-button/GoogleLoginButton";
import FormInput from "../components/form-input/formInput";

interface RegistrationErrors {
  general?: string;
}

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );

    if (validationError) {
      setErrors({ general: validationError });
      return;
    } else {
      setErrors({});
    }
    // Send to backend
  };

  return (
    <div className="bg-stone-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen mx-3 ">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8 md:py-10 md:px-10">
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-white text-center mb-6">
            Sign Up
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-3 mb-4">
              <FormInput
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                styles="w-1/2"
              />
              <FormInput
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                styles="w-1/2"
              />
            </div>
            <FormInput
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              styles="mb-4"
            />
            <FormInput
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles="mb-4"
            />
            <FormInput
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles="mb-4"
            />
            <FormInput
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              styles="mb-4"
            />
            {errors.general && (
              <p className="text-red-500 text-sm m-2 mt-0 text-center">
                {errors.general}
              </p>
            )}
            <button
              type="submit"
              className="bg-emerald-600 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200"
            >
              Submit
            </button>
          </form>
          <GoogleLoginButton />
          <p className="text-gray-800 dark:text-white mt-4 text-center">
            Already have an account?
            <Link href="/sign-in" className="underline mt-4 px-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function validateForm(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  let validationError = "";
  switch (true) {
    case !firstName:
      validationError = "First Name is required";
      break;
    case !lastName:
      validationError = "Last Name is required";
      break;
    case !username:
      validationError = "Username is required";
      break;
    case !email:
      validationError = "Email is required";
      break;
    case !/\S+@\S+\.\S+/.test(email):
      validationError = "Invalid email format";
      break;
    case !password:
      validationError = "Password is required";
      break;
    case password.length < 6:
      validationError = "Password must be at least 6 characters long";
      break;
    case password !== confirmPassword:
      validationError = "Passwords do not match";
      break;
  }
  return validationError;
}

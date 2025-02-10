"use client";
import Link from "next/link";
import { useState, Dispatch, SetStateAction } from "react";
import GoogleLoginButton from "@/components/google-login-button/GoogleLoginButton";
import FormInput from "@/components/form-input/formInput";
import axios, { AxiosError } from "axios";

interface RegistrationErrors {
  non_field_errors?: string;
  username?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
}

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const isErr = validateForm(
      setErrors,
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );
    if (isErr) return;
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/register/`,
        {
          username: username,
          first_name: firstName || null,
          last_name: lastName || null,
          email: email,
          date_of_birth: dateOfBirth || null,
          password: password,
          password_confirm: confirmPassword,
        }
      );
      setIsLoading(false);
      setSuccessMessage(response.data.message || "Registration successful!");
      console.log("Registration successful:", response);
    } catch (err: unknown) {
      setIsLoading(false);
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.data &&
        typeof err.response.data === "object"
      ) {
        setErrors(err.response.data as RegistrationErrors);
      } else {
        setErrors({
          non_field_errors: "Registration failed. Please try again.",
        });
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value;
    const [year, month, day] = formattedValue.split("-");
    formattedValue = `${year}-${month}-${day}`;
    setDateOfBirth(formattedValue);
  };

  return (
    <div className="bg-stone-300 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center mx-3 my-5 md:my-8">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8 md:py-10 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-white text-center mb-3 md:mb-6">
            Sign Up
          </h2>
          {successMessage && (
            <p className="text-green-500 text-sm m-2 mt-0 text-center">
              {successMessage}
            </p>
          )}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-3 mb-2 md:mb-4">
              <FormInput
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                styles="w-1/2"
                error={errors.first_name}
              />
              <FormInput
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                styles="w-1/2"
                error={errors.last_name}
              />
            </div>
            <FormInput
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              styles="mb-2 md:mb-4"
              error={errors.username}
              required={true}
            />
            <FormInput
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.email}
            />
            <FormInput
              type="date"
              value={dateOfBirth}
              placeholder="Date of Birth"
              onChange={handleDateChange}
              styles="mb-2 md:mb-4"
              error={errors.date_of_birth}
            />
            <FormInput
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.password}
            />
            <FormInput
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.password_confirm}
            />
            {errors.non_field_errors && (
              <p className="text-red-500 text-sm m-2 mt-0 text-center">
                {errors.non_field_errors}
              </p>
            )}
            <button
              type="submit"
              className="mt-1 bg-emerald-600 dark:bg-blue-700 text-white text-sm md:text-md font-medium py-1.5 md:py-3 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Submit"}
            </button>
          </form>
          <GoogleLoginButton />
          <p className="text-gray-800 dark:text-white mt-2 md:mt-4 text-center">
            Already have an account?
            <Link href="/sign-in" className="underline mt-2 md:mt-4 px-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function validateForm(
  setErrors: Dispatch<SetStateAction<RegistrationErrors>>,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  let isError = false;
  switch (true) {
    case !username:
      setErrors({ username: "Username is required" });
      isError = true;
      break;
    case !email:
      setErrors({ email: "Email is required" });
      isError = true;
      break;
    case !/\S+@\S+\.\S+/.test(email):
      setErrors({ email: "Invalid email format" });
      isError = true;
      break;
    case !password:
      setErrors({ password: "Password is required" });
      isError = true;
      break;
    case password !== confirmPassword:
      setErrors({ password_confirm: "Passwords do not match" });
      isError = true;
      break;
  }
  return isError;
}

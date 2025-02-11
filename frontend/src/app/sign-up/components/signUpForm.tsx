"use client";
import Link from "next/link";
import { useState } from "react";
import GoogleLoginButton from "@/components/google-login-button/GoogleLoginButton";
import FormInput from "@/components/form-input/formInput";
import { AxiosError } from "axios";
import { validateForm } from "@/utils/form-validation/validation";
import { RegistrationErrors } from "@/utils/form-validation/validation";
import { registerUser } from "@/app/api/auth/[...nextauth]/auth";

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dateOfBirth,
    } = formData;

    if (validateForm(setErrors, username, email, password, confirmPassword))
      return;

    setIsLoading(true);
    setSuccessMessage("");
    try {
      const response = await registerUser({
        username: username,
        first_name: firstName || null,
        last_name: lastName || null,
        email: email,
        date_of_birth: dateOfBirth || null,
        password: password,
        password_confirm: confirmPassword,
      });
      setIsLoading(false);
      setSuccessMessage(response.data.message || "Registration successful!");
      //redirect in the future
      console.log("Registration successful:", response);
    } catch (err: unknown) {
      setIsLoading(false);
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response?.data &&
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
    setFormData({ ...formData, dateOfBirth: formattedValue });
  };

  return (
    <div className="bg-stone-300 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center mx-3 my-5 md:my-8">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8 md:py-10 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-white text-center mb-3 md:mb-6">
            Sign Up
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-3 mb-2 md:mb-4">
              <FormInput
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                styles="w-1/2"
                error={errors.first_name}
              />
              <FormInput
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                styles="w-1/2"
                error={errors.last_name}
              />
            </div>
            <FormInput
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              styles="mb-2 md:mb-4"
              error={errors.username}
              required={true}
            />
            <FormInput
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.email}
            />
            <FormInput
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              placeholder="Date of Birth"
              onChange={handleDateChange}
              styles="mb-2 md:mb-4"
              error={errors.date_of_birth}
            />
            <FormInput
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.password}
            />
            <FormInput
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              styles="mb-2 md:mb-4"
              required={true}
              error={errors.password_confirm}
            />
            {errors.non_field_errors && (
              <p className="text-red-500 text-sm m-2 mt-0 text-center">
                {errors.non_field_errors}
              </p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm m-2 mt-0 text-center">
                {successMessage}
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

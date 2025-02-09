"use client";
import Link from "next/link";
import GoogleLoginButton from "../components/google-login-button/GoogleLoginButton";
import { useState } from "react";
import FormInput from "../components/form-input/formInput";

interface LoginErrors {
  general?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationError = "";

    if (!email) {
      validationError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationError = "Invalid email format";
    } else if (!password) {
      validationError = "Password is required";
    }

    if (validationError) {
      setErrors({ general: validationError });
      return;
    } else {
      setErrors({});
    }

    // Send the data
  };

  return (
    <div className="bg-stone-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen mx-3 ">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8 md:py-10 md:px-10">
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-white text-center mb-6">
            Sign In
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <FormInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              styles="mb-4"
            />
            <FormInput
              type={password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              styles="mb-4"
            />
            {errors.general && (
              <p className="text-red-500 text-sm m-3 mt-0 text-center">
                {errors.general}
              </p>
            )}
            <button className="bg-emerald-600 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200">
              Login
            </button>
          </form>
          <GoogleLoginButton />
          <p className="text-gray-800 dark:text-white mt-4 text-center">
            Don&apos;t have an account yet?
            <Link href="/sign-up" className="underline mt-4 px-2">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

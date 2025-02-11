"use client";
import Link from "next/link";
import GoogleLoginButton from "@/components/google-login-button/GoogleLoginButton";
import { useState } from "react";
import FormInput from "@/components/form-input/formInput";
import axios, { AxiosError } from "axios";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!identifier) {
      setError("Email or username are required");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        { identifier: identifier, password: password }
      );
      setIsLoading(false);

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      //redirect
    } catch (err) {
      setIsLoading(false);
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.data &&
        err.response.data.error
      ) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again."); // Generic error
      }
    }
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
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or username"
              styles="mb-4"
              required={true}
            />
            <FormInput
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              styles="mb-4"
              required={true}
            />
            {error && (
              <p className="text-red-500 text-sm m-3 mt-0 text-center">
                {error}
              </p>
            )}
            <button className="bg-emerald-600 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200">
              {isLoading ? "Logging In..." : "Login"}
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

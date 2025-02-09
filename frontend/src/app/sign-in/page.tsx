"use client";
import Link from "next/link";
import GoogleLoginButton from "../sign-in/components/google-login-button/GoogleLoginButton";

export default function Login() {
  return (
    <div className="bg-stone-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen mx-3 ">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8 md:py-10 md:px-10">
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-white text-center mb-6">
            Sign In
          </h2>
          <form className="flex flex-col">
            <input
              placeholder="Email"
              className="mb-4 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 focus:outline-none dark:placeholder-gray-300"
              type="email"
            />
            <input
              placeholder="Password"
              className="mb-4 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 focus:outline-none dark:placeholder-gray-300"
              type="password"
            />
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

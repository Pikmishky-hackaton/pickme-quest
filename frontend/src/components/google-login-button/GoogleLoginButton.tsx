"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleLoginButton() {
  return (
    <div className="w-full mb-2 md:mb-5 mt-2 md:mt-4">
      <button
        className="w-full flex items-center justify-center px-4 py-1 md:py-2 border gap-2 border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={() => signIn("google")}
      >
        <Image
          width={5}
          height={5}
          className="w-3 h-3 md:w-6 md:h-3"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

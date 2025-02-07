import Link from "next/link";

export default function Registration() {
  return (
    <div className="bg-stone-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen mx-3 ">
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg py-8 px-8">
          <h2 className="text-3xl font-bold text-emerald-600 dark:text-white text-center mb-6">
            Sign Up
          </h2>
          <form className="flex flex-col">
            <div className="flex space-x-3 mb-4">
              <input
                placeholder="First Name"
                type="text"
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 w-1/2 focus:outline-none dark:placeholder-gray-300"
              />
              <input
                placeholder="Last Name"
                type="text"
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 w-1/2 focus:outline-none dark:placeholder-gray-300"
              />
            </div>
            <input
              placeholder="Username"
              className="mb-4 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 focus:outline-none dark:placeholder-gray-300"
              type="text"
            />
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
            <input
              placeholder="Confirm password"
              className="mb-4 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 focus:outline-none dark:placeholder-gray-300"
              type="password"
            />
            <button className="bg-emerald-600 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200">
              Submit
            </button>
            <p className="text-gray-800 dark:text-white mt-4 text-center">
              Already have an account?
              <Link href="/signUp" className="underline mt-4 px-2">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Account() {
  const [firstName] = useState("User");
  const [existingForms] = useState([
    { name: "Form1", dateOfCreation: Date.now },
  ]);
  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-10 flex justify-between  flex-col  text-black dark:text-white">
        <p className="text-5xl pb-10">Hello, {firstName}</p>
        <h1 className="text-2xl font-bold mb-4">My account</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My forms</h2>
          <button className="flex items-center gap-2 text-xl mt-3 w-36 h-12 bg-emerald-600 dark:bg-blue-700 text-white  font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200">
            <Plus size={16} /> Add form
          </button>
        </div>
        <table className="w-full border-collapse border dark:border-gray-200 ">
          <thead className="bg-gray-300 dark:bg-gray-600 ">
            <tr>
              <th className="border border-gray-800 dark:border-gray-300 ">
                Name
              </th>
              <th className="border border-gray-800 dark:border-gray-300">
                Date of creation
              </th>
              <th className="border border-gray-800 dark:border-gray-300">
                Watch
              </th>
            </tr>
          </thead>
          <tbody>
            {existingForms.map((form) => (
              <tr
                key={form.dateOfCreation()}
                className="border border-gray-800 dark:border-gray-300"
              >
                <td className="border border-gray-800 dark:border-gray-300 p-2">
                  {form.name}
                </td>
                <td className="border border-gray-800 dark:border-gray-300 p-2">
                  {form.dateOfCreation()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

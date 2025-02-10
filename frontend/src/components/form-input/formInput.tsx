import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  styles?: string;
  required?: boolean;
  error?: string;
}

export default function FormInput({
  type = "text",
  value,
  onChange,
  placeholder,
  styles,
  required = false,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  console.log(error);
  return (
    <div className="w-full">
      <label
        className={`block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium mb-1 ${
          error ? "text-red-500 dark:text-red-500" : ""
        }`}
      >
        {error ? error : placeholder}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-1.5 md:p-2.5 focus:outline-none dark:placeholder-gray-300 w-full ${
            styles ? styles : ""
          } `}
          required={required}
        />
        {isPasswordField && (
          <button
            type="button"
            className=" absolute top-1/2 -translate-y-4 right-2 flex items-center text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

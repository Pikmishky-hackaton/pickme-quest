interface FormInput {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  styles?: string;
}

export default function FormInput({
  type = "text",
  value,
  onChange,
  placeholder,
  styles,
}: FormInput) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white border-0 rounded-md p-2 focus:outline-none dark:placeholder-gray-300 w-full ${
        styles ? styles : ""
      }`}
    />
  );
}

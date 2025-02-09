import ThemeSwitch from "@/components/theme/themeSwitch";

export default function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold text-emerald-700 dark:text-white">
          PickMe Quest
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
}

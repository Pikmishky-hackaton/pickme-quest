export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 h-96 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-10 flex justify-between items-center">
        <div className="flex flex-col items-center justify-center text-center text-red-600">
          <p className="text-5xl font-bold text-emerald-600 dark:text-white text-center mb-6">
            Pickme quests
          </p>
          <p className=" text-xl w-80 font-bold text-emerald-600 dark:text-white text-center mb-6">
            Create your own quests and solve already existing ones with ease.
          </p>
          <button className="text-xl mt-3 w-52 h-12 bg-emerald-600 dark:bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-emerald-500 dark:hover:bg-blue-800 transition ease-in duration-200">
            Start exploring
          </button>
        </div>

        <div className="w-72 h-72   flex justify-center items-center  bg-[url('/logo.png')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}

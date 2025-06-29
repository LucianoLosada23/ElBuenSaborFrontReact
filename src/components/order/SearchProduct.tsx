import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchProduct() {
  return (
    <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        ¿Qué estás buscando hoy?
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-0 border border-gray-900 rounded-full p-1 sm:p-2 items-center bg-white">
        <div className="relative w-full">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Pizza, hamburguesa, bebidas..."
            className="w-full pl-10 pr-2 py-2 sm:py-2 focus:outline-none focus:ring-0 focus:border-transparent rounded-full sm:rounded-none border sm:border-0 border-gray-300 sm:border-transparent"
          />
        </div>
        <button className="w-full sm:w-auto text-white cursor-pointer px-4 py-2 sm:py-3 text-sm sm:text-[14px] rounded-full bg-principal hover:bg-terciario font-semibold">
          Buscar
        </button>
      </div>
    </div>
  );
}
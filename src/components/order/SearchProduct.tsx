import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchProduct() {
  return (
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <h2 className=" text-3xl font-bold text-center text-gray-800 mb-6">
          ¿Qué estás buscando hoy?
        </h2>
        <div className="grid grid-cols-[90%_10%] border border-gray-900 rounded-full p-2 items-center bg-white">
          <div className="relative w-full">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Pizza, hamburguesa, bebidas..."
              className="w-full pl-10 pr-2 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <button className="w-full text-white cursor-pointer py-3 text-[14px] rounded-full bg-principal hover:bg-terciario font-semibold">
            Buscar
          </button>
        </div>
      </div>
  );
}

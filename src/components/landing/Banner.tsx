import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Banner() {
  return (
    <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 items-center px-6">
      {/* Sección Izquierda */}
      <div className="relative space-y-6">
        <h1 className="text-5xl md:text-7xl max-w-[500px] font-display font-bold relative">
          Ordena Desde La Comodidad De Casa
          <img
            src="/arrow-19.svg"
            alt="flecha"
            loading="lazy"
            width={100}
            height={40}
            className="absolute bottom-[-70px] right-[90px]"
          />
        </h1>
        <Link to={"/catalogo"}>
          <Button text={"Ordenar Ahora !"} width={6} height={1} size={16} />
        </Link>
      </div>

      {/* Sección Derecha - Imagen del Banner */}
      <div className="w-full flex justify-center">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src="/banner.jpg"
            loading="lazy"
            alt="Imagen del banner"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/12 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

import type { FC } from "react";
import type { Product } from "../../models/Product";
import Button from "../ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface ProductPopupProps {
  product: Product;
  onClose: () => void;
}

export const ProductPopup: FC<ProductPopupProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
      <div className="bg-white rounded-lg shadow-lg w-[500px] relative overflow-hidden">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-gray-500 text-black text-xl font-bold cursor-pointer"
        >
          <XMarkIcon width={32} height={32}/>
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mt-12 mb-4"
        />

        <div className="p-4 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-gray-700">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div
              className={`text-white text-sm px-3 py-1 rounded-full ${
                Number(product.time) > 20
                  ? "bg-amarillo"
                  : Number(product.time) > 10
                  ? "bg-principal"
                  : "bg-verde"
              }`}
            >
              {`${product.time} min`}
            </div>

            <Button
              text="Agregar al carrito"
              width={2}
              height={0.5}
              size={13}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

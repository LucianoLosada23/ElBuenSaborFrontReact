import { useEffect, useState, type FC } from "react";
import type { Product } from "../../types/shop/product/Product";
import {
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";

interface ProductPopupProps {
  product: Product;
}

export const ProductPopup: FC<ProductPopupProps> = ({ product }) => {

  const {addToCart} = useCart()
  const {clearProduct} = useProduct()

  const [amount, setamount] = useState<number>(1);
  const [clarifications, setclarifications] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAddToCart = () => {
    addToCart({ product, amount, clarifications });
    clearProduct()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[500px] h-[90vh] relative flex flex-col overflow-hidden">
        {/* Botón de cierre */}
        <button
          onClick={() =>  clearProduct()}
          className="absolute top-2 right-2 hover:text-gray-500 text-black text-xl font-bold cursor-pointer z-10"
        >
          <XMarkIcon width={24} height={24} />
        </button>

        {/* Header */}
        <div className="p-4 pt-10 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-46 object-cover rounded mb-4"
          />
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-700 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        </div>

        {/* Contenido con scroll */}
        <div className="p-4 overflow-y-auto flex flex-col gap-6">
          <div className="border border-gray-300 flex justify-between items-center rounded p-4">
            <h4 className="font-medium">Tiempo</h4>
            <div
              className={"text-sm font-medium px-3 py-1 rounded-full mt-2 inline-block"}
            >
              {`${product.time} min`}
            </div>
          </div>

          <div className="border border-gray-300 flex justify-between items-center rounded p-4">
            <h4 className="font-medium">Unidades</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setamount((prevCantidad) => Math.max(1, prevCantidad - 1))
                }
                disabled={amount === 1}
                className={`px-2 py-1 bg-gray-200 rounded text-sm font-medium cursor-pointer hover:bg-gray-300 ${
                  amount === 1 ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                −
              </button>
              <span className="font-semibold text-sm">{amount}</span>
              <button
                onClick={() => setamount((prevCantidad) => prevCantidad + 1)}
                className="px-2 py-1 bg-gray-200 rounded text-sm font-medium cursor-pointer hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded p-4 flex flex-col gap-2">
            <label htmlFor="aclaraciones" className="font-medium">
              ¿Aclaraciones?
            </label>
            <textarea
              id="aclaraciones"
              className="border border-gray-300 rounded p-2 resize-none focus:outline-none"
              rows={4}
              placeholder="Escribí alguna instrucción especial si lo necesitás..."
              value={clarifications}
              onChange={(e) => setclarifications(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Botón al fondo */}
        <div className="p-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-principal text-white cursor-pointer py-4 rounded-full flex items-center justify-center gap-2 text-sm font-semibold uppercase hover:bg-terciario transition"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Agregar a mi pedido
          </button>
        </div>
      </div>
    </div>
  );
};

import {useState, type FC } from "react";
import type { Product } from "../../types/shop/product/Product";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import Modal from "../ui/Modal";
import { useUIState } from "../../hooks/ui/useUIState";

interface ProductPopupProps {
  product: Product;
}

export const ProductPopup: FC<ProductPopupProps> = ({ product }) => {
  // Redux hooks
  const { addToCart } = useCart();
  const { clearProduct } = useProduct();
  const { isProductModal, toggle } = useUIState();

  // State
  const [amount, setamount] = useState<number>(1);
  const [clarifications, setclarifications] = useState<string>("");

  const handleAddToCart = () => {
    addToCart({ product, amount, clarifications });
    clearProduct();
  };

  return (
    <Modal
      isOpen={isProductModal}
      onClose={() => toggle("isProductModal")}
      title={product.name}
    >
      <div className="mt-8 border-t border-gray-200 p-4 flex gap-6 max-h-[600px]">
        {/* Imagen centrada */}
        <div className="flex-shrink-0 flex items-center justify-center w-[400px] h-[400px] border border-gray-200 rounded overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Contenido y controles */}
        <div className="flex flex-col flex-grow max-h-[400px]">
          {/* Contenido con scroll */}
          <div className="overflow-y-auto flex-grow pr-2">
            <p className="font-bold mb-6">$ {product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="border border-gray-200 flex justify-between items-center rounded p-4 mb-4">
              <h4 className="font-medium">Tiempo</h4>
              <div className="text-sm font-medium px-3 py-1 rounded-full inline-block">
                {product.time} min
              </div>
            </div>

            <div className="border border-gray-200 rounded p-4 mb-4">
              <label htmlFor="aclaraciones" className="font-medium block mb-2">
                ¿Aclaraciones?
              </label>
              <textarea
                id="aclaraciones"
                className="w-full border border-gray-200 rounded p-2 resize-none focus:outline-none"
                rows={4}
                placeholder="Escribí alguna instrucción especial si lo necesitás..."
                value={clarifications}
                onChange={(e) => setclarifications(e.target.value)}
              />
            </div>
          </div>

          {/* Control de unidades y botón */}
          <div className="flex items-center gap-4 mt-4">
            <div className="border border-gray-200 flex items-center rounded p-4 gap-4">
              <h4 className="font-medium">Unidades</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setamount((prev) => Math.max(1, prev - 1))
                  }
                  disabled={amount === 1}
                  className={`px-3 py-1 bg-gray-200 rounded text-sm font-medium cursor-pointer hover:bg-gray-300 ${
                    amount === 1 ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                >
                  −
                </button>
                <span className="font-semibold text-lg">{amount}</span>
                <button
                  onClick={() => setamount((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded text-sm font-medium cursor-pointer hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-grow bg-principal text-white py-4 cursor-pointer rounded-full flex items-center justify-center gap-2 text-sm font-semibold uppercase hover:bg-terciario transition"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Agregar a mi pedido
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

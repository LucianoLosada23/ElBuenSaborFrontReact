import type { FC } from "react";
import type { Product } from "../../models/Product";
import Button from "../ui/Button";

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
}

export const ProductPopup: FC<ProductPopupProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          &times;
        </button>
        <img src={product.image} className="w-full h-48 object-cover mb-4 rounded-lg" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 pb-2">{product.description}</p>
        <Button
            text="Agregar al carrito"
            width={0.5}
            height={0.5}
            size={11}
        />
      </div>
    </div>
  );
};

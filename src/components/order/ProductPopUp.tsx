import { useEffect, type FC } from "react";
import type { Product } from "../../types/Product";
import { MinusIcon, PlusIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { removeFromCart } from "../../features/productSlice";

interface ProductPopupProps {
  product: Product ;
}

export const ProductPopup: FC<ProductPopupProps> = ({ product} ) => {
  const dispatch = useDispatch();


  useEffect(() => { //Desactivar scroll externo
    // Al montar: bloquear scroll
    document.body.style.overflow = "hidden";

    // Al desmontar: restaurar scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs z-50">
      <div className="bg-white rounded-xl shadow-lg w-[500px] h-[90vh] relative flex flex-col overflow-hidden">
        
        {/* Botón de cierre */}
        <button
          onClick={() => dispatch(removeFromCart())}
          className="absolute top-2 right-2 hover:text-gray-500 text-black text-xl font-bold cursor-pointer z-10"
        >
          <XMarkIcon width={24} height={24} />
        </button>

        {/* Header fijo */}
        <div className="p-4 pt-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-46 object-cover rounded mb-4"
          />
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-700 font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
         
        </div>

        {/* Contenido con scroll */}
        <div className="p-4 pt-0 overflow-y-auto  flex flex-col gap-4">
          <div className="border flex justify-between items-center rounded p-4">
            <h4 className="font-medium">Tiempo</h4>
            <div
            className={` text-sm font-bold px-3 py-1 rounded-full mt-2 inline-block ${
              Number(product.time) > 20
                ? "bg-amarillo-pastel text-amarillo"
                : Number(product.time) > 10
                ? "bg-rojo-pastel text-principal"
                : "bg-verde-pastel text-verde"
            }`}
          >
            {`${product.time} min`}
          </div>
          </div>

          <div className="border flex justify-between items-center rounded p-4">
            <h4 className="font-medium">Unidades</h4>
            <div className="flex gap-2 bg-gray-200 py-1 px-2 rounded-full items-center">
              <MinusIcon width={20} height={20} className="cursor-pointer" />
              <span>1</span>
              <PlusIcon width={20} height={20} className="cursor-pointer" />
            </div>
          </div>

          <div className="border rounded p-4 flex flex-col gap-2">
            <label htmlFor="aclaraciones" className="font-medium">¿Aclaraciones?</label>
            <textarea
              id="aclaraciones"
              className="border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-principal"
              rows={4}
              placeholder="Escribí alguna instrucción especial si lo necesitás..."
            ></textarea>
          </div>
        </div>

        {/* Botón fijo al fondo */}
        <div className="p-4">
          <button
            onClick={() => {
              dispatch(addToCart(product));
              dispatch(removeFromCart())
            }}
            className="w-full bg-principal text-white cursor-pointer py-3 rounded-full flex items-center justify-center gap-2 text-sm font-semibold uppercase hover:bg-terciario transition"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Agregar a mi pedido
          </button>
        </div>
      </div>
    </div>
  );
};

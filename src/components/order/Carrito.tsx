import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleCart } from '../../features/cartSlice';

export default function Carrito() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * (item.cantidad ?? 1), 0);
  const descuento = subtotal * 0.1;
  const total = subtotal - descuento;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-86 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Mi Orden</h1>
        <button onClick={() => dispatch(toggleCart())} className="cursor-pointer">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="p-4 flex justify-center items-center h-[calc(100%-240px)]">
          <p>No hay productos agregados al carrito</p>
        </div>
      ) : (
        <>
        
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-240px)]">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{item.product.id}</p>
                <p>Precio: ${item.product.price.toFixed(2)}</p>
                {item.cantidad && <p>Cantidad: {item.cantidad}</p>}
              </div>
            </div>
          ))}
        </div>

      <div className="p-4 border-t">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>10% OFF Retiro en local</span>
          <span>-${descuento.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="bg-principal w-full py-2 mt-4 rounded text-white font-bold">
          Continuar compra
        </button>
      </div>
      </>
      )}

    </div>
  );
}

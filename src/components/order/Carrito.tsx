import React from 'react'
import type { Product } from '../../models/Product'
import type { Carrito as CarritoType } from '../../models/Carrito'
import { XMarkIcon } from "@heroicons/react/24/outline"

type Props = {
  carrito: CarritoType[];
  removeCarrito: (product: Product) => void;
  onClose: () => void;
  isOpen: boolean;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
}
export default function Carrito({ carrito, removeCarrito, onClose, isOpen , increaseQuantity, decreaseQuantity }: Props) {

    if (!carrito){
        carrito = []
    }

    if (carrito.length === 0) {
      return (
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h1 className="text-xl font-bold">Mi Orden</h1>
            <button onClick={onClose}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 flex justify-center items-center h-[calc(100%-240px)]">
            <p>No hay productos agregados al carrito</p>
          </div>
        </div>
      );
    }
  
    const subtotal = carrito.reduce((acc, item) => acc + item.product.price * item.cantidad, 0);
    const descuento = subtotal * 0.1;
    const total = subtotal - descuento;
  
    return (
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold">Mi Orden</h1>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
  
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-240px)]">
          {carrito.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <div className="flex items-center space-x-2 mt-2">
                    <button
                        onClick={() => decreaseQuantity(item.product)}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                    >
                        -
                    </button>
                    <span className="font-medium">{item.cantidad}</span>
                    <button
                        onClick={() => increaseQuantity(item.product)}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                    >
                        +
                    </button>
                </div>
                <p>Precio: ${item.product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeCarrito(item.product)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
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
      </div>
    );
  }
  
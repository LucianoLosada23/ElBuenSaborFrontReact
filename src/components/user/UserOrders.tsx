import { use, useEffect, useState } from "react";
import type { ListaDeOrdenes } from "../../types/user/UserOrder";
import { getAllUserOrder } from "../../services/user/UserOrder";

export default function UserOrders() {
  const [userOrder, setUserOrder] = useState<ListaDeOrdenes>([]);
  useEffect(() => {
    const fetchOrdenes = async () => {
      const data = await getAllUserOrder();
      if (data) {
        setUserOrder(data);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12">
      <h2 className="text-3xl font-semibold mb-6">Mis Órdenes</h2>
      <div className="grid grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
        {userOrder.map((order) => (
          <div
            key={order.id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-2">Orden #{order.id}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Fecha: {new Date(order.fecha).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">Estado: {order.estado}</p>
            <ul className="list-disc pl-5">
              {order.detalle.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

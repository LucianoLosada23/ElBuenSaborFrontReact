import { useEffect, useState } from "react";
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
    <div className="bg-white max-w-6xl mx-auto mt-4 md:mt-10 rounded-lg md:rounded-2xl shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Mis Órdenes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh]">
        {userOrder.map((order) => (
          <div
            key={order.id}
            className="bg-gray-50 p-3 sm:p-4 rounded-md sm:rounded-lg shadow-xs sm:shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Orden #{order.id}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
              Fecha: {new Date(order.fecha).toLocaleDateString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Estado: {order.estado}</p>
            <ul className="list-disc pl-4 sm:pl-5">
              {order.detalle.map((item, index) => (
                <li key={index} className="text-xs sm:text-sm text-gray-700">
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
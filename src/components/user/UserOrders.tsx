import { useEffect, useState } from "react";
import { getAllUserOrder } from "../../services/user/UserOrder";
import type { OrderList } from "../../types/user/UserOrder";
import { translateStatus, translateDeliveryType, statusColorMap } from "../../utils/statusTranslations";
import { CalendarIcon, TruckIcon } from "@heroicons/react/24/solid";

export default function UserOrders() {
  const [userOrder, setUserOrder] = useState<OrderList>([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      const data = await getAllUserOrder();
      console.log("Ordenes de usuario:", data);
      if (data) setUserOrder(data);
    };
    fetchOrdenes();
  }, []);

  return (
    <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12">
      <h2 className="text-3xl font-semibold mb-6">Mis Órdenes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
        {userOrder.map((order) => (
          <div key={order.id} className="bg-gray-50 p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Orden #{order.id}</h3>
              <span
                className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${statusColorMap[order.status]}`}
              >
                {translateStatus(order.status)}
              </span>
            </div>
            <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(order.initAt).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <TruckIcon className="h-4 w-4 mr-1" />
                    {translateDeliveryType(order.deliveryType)}
                  </p>
                </div>

            <ul className="list-disc pl-5 mb-4">
              {order.orderProducts.map((item, index) => (
                <li key={index} className="text-sm text-gray-800">
                  <span className="font-medium">{item.productTitle}</span> — {item.quantity} u. — ${item.price}
                </li>
              ))}
            </ul>

            <p className="text-lg font-bold text-gray-700 mt-3 text-right">
              Total: ${order.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

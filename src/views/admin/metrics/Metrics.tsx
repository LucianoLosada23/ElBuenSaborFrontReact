import { useEffect, useState } from "react";
import { getAllOrdersByCompany } from "../../../services/admin/order/order";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Metrics() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getAllOrdersByCompany();

        if (!orders || orders.length === 0) {
          setChartData(null);
          return;
        }

        const grouped = orders.reduce((acc: Record<string, number>, order: any) => {
          const date = new Date(order.createdAt).toLocaleDateString("es-AR");
          acc[date] = (acc[date] || 0) + order.total;
          return acc;
        }, {});

        const labels = Object.keys(grouped);
        const values = Object.values(grouped);

        if (labels.length === 0) {
          setChartData(null);
        } else {
          setChartData({
            labels,
            datasets: [
              {
                label: "Total de pedidos por día",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 className="text-xl font-bold mb-4">Métricas</h2>
      {loading ? (
        <p>Cargando datos...</p>
      ) : chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Totales por día" },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      ) : (
        <p>No hay pedidos registrados.</p>
      )}
    </div>
  );
}

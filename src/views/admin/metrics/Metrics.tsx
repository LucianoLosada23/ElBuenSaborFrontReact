import { useEffect, useState } from "react";
import { getAllOrdersByCompany } from "../../../services/admin/order/order";
import { getAllProduct } from "../../../services/admin/product/product";
import { getAllIngredients } from "../../../services/admin/insumos/Ingredients";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = [
  "#36A2EB", "#FF6384", "#FFCE56",
  "#4BC0C0", "#9966FF", "#FF9F40", "#999999",
];

export default function Metrics() {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any>(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [productsCount, setProductsCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);

  const [productLineData, setProductLineData] = useState<any>(null);
  const [productsSoldLineData, setProductsSoldLineData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrdersByCompany();
        const products = await getAllProduct();
        const ingredients = await getAllIngredients();

        setProductsCount(products?.length || 0);
        setIngredientsCount(ingredients?.length || 0);

        // Agrupar productos por fecha (cantidad diaria)
        const groupedProducts: Record<string, number> = {};
        products.forEach((product: any) => {
          const date = new Date(product.createdAt).toLocaleDateString("es-AR");
          groupedProducts[date] = (groupedProducts[date] || 0) + 1;
        });
        const sortedProductDates = Object.keys(groupedProducts).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );
        setProductLineData({
          labels: sortedProductDates,
          datasets: [
            {
              label: "Productos cargados por día",
              data: sortedProductDates.map((d) => groupedProducts[d]),
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: true,
              tension: 0.3,
            },
          ],
        });

        if (!orders || orders.length === 0) {
          setLabels([]);
          setDatasets([]);
          setPieData(null);
          setProductsSoldLineData(null);
          return;
        }

        // Filtrar órdenes por fecha
        const filteredOrders = orders.filter((order: any) => {
          const orderDate = new Date(order.initAt);
          const start = fechaInicio ? new Date(fechaInicio) : null;
          const end = fechaFin ? new Date(fechaFin) : null;
          if (start && orderDate < start) return false;
          if (end && orderDate > end) return false;
          return true;
        });

        // Gráfico órdenes por día y estado
        const groupedByDateAndStatus: Record<string, Record<string, number>> = {};
        const totalByStatus: Record<string, number> = {};

        for (const order of filteredOrders) {
          const date = new Date(order.initAt).toLocaleDateString("es-AR");
          const status = order.status;
          if (!groupedByDateAndStatus[date]) groupedByDateAndStatus[date] = {};
          groupedByDateAndStatus[date][status] =
            (groupedByDateAndStatus[date][status] || 0) + 1;
          totalByStatus[status] = (totalByStatus[status] || 0) + 1;
        }

        const uniqueDates = Object.keys(groupedByDateAndStatus).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        const allStatuses = Array.from(new Set(filteredOrders.map((o: any) => o.status)));

        const chartDatasets = allStatuses.map((status, index) => ({
          label: status,
          data: uniqueDates.map(
            (date) => groupedByDateAndStatus[date]?.[status] || 0
          ),
          backgroundColor: COLORS[index % COLORS.length],
          borderColor: COLORS[index % COLORS.length],
          fill: false,
          borderWidth: 2,
        }));

        const pieChartData = {
          labels: allStatuses,
          datasets: [
            {
              label: "Órdenes por estado",
              data: allStatuses.map((status) => totalByStatus[status] || 0),
              backgroundColor: allStatuses.map(
                (_, i) => COLORS[i % COLORS.length]
              ),
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        };

        setLabels(uniqueDates);
        setDatasets(chartDatasets);
        setPieData(pieChartData);

        // Gráfico productos vendidos por día solo DELIVERED
        const deliveredOrders = filteredOrders.filter((o: any) => o.status === "DELIVERED");
        const productsSoldByDate: Record<string, number> = {};

        deliveredOrders.forEach((order: any) => {
          const date = new Date(order.initAt).toLocaleDateString("es-AR");
          const totalQuantity = order.orderProducts?.reduce(
            (sum: number, op: any) => sum + (op.quantity || 0),
            0
          ) || 0;

          productsSoldByDate[date] = (productsSoldByDate[date] || 0) + totalQuantity;
        });

        const sortedSoldDates = Object.keys(productsSoldByDate).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        setProductsSoldLineData({
          labels: sortedSoldDates,
          datasets: [
            {
              label: "Productos vendidos por día (DELIVERED)",
              data: sortedSoldDates.map((d) => productsSoldByDate[d]),
              borderColor: "#4BC0C0",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              fill: true,
              tension: 0.3,
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching data:", error);
        setLabels([]);
        setDatasets([]);
        setPieData(null);
        setProductsSoldLineData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fechaInicio, fechaFin]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2 className="text-xl font-bold mb-4">Métricas</h2>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : labels.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <Bar
            data={{ labels, datasets }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Órdenes por día y estado (Barras)" },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "right" },
                title: { display: true, text: "Distribución total por estado" },
              },
            }}
          />
          <Line
            data={{
              labels: ["Productos", "Insumos"],
              datasets: [
                {
                  label: "Cantidad total",
                  data: [productsCount, ingredientsCount],
                  borderColor: "#36A2EB",
                  backgroundColor: "rgba(54,162,235,0.5)",
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                title: { display: true, text: "Cantidad de productos e insumos" },
              },
              scales: {
                y: { beginAtZero: true, precision: 0 },
              },
            }}
          />
          {productsSoldLineData && (
            <Line
              data={productsSoldLineData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Productos vendidos por día (DELIVERED)",
                  },
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          )}
          {productLineData && (
            <Line
              data={productLineData}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Productos cargados por día" },
                  legend: { position: "top" },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          )}
        </div>
      ) : (
        <p>No hay pedidos en el rango seleccionado.</p>
      )}
    </div>
  );
}

import { useAuth } from "../../../hooks/auth/useAuth";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto mt-16 p-6 text-center text-gray-500">
        Cargando información de usuario...
      </main>
    );
  }

  // Obtener el rol, dependiendo si es empleado o compañía
  const role =
    user.user?.User?.roleEmployee?.toLowerCase() ||
    user.user?.User?.role?.toLowerCase() ||
    "";

  // Obtener nombre y email, tratando de sacar de donde corresponda
  const name = user.user?.User?.name || "Usuario";

  const email = user.user?.User?.email || "No disponible";

  let title = "Bienvenido";
  let description = "Accede a tus funciones según tu rol asignado.";
  let actions: string[] = [];

  switch (role) {
    case "company":
      title = "Bienvenido, Administrador";
      description = "Gestiona usuarios, productos y órdenes desde el panel administrativo.";
      actions = [
        "Crear, editar y eliminar usuarios",
        "Administrar productos y stock",
        "Ver y gestionar todas las órdenes",
        "Configurar parámetros de la compañía",
      ];
      break;
    case "cashier": // equivale a cajero
      title = "Hola, Cajero";
      description = "Procesa pagos y revisa las órdenes pendientes aquí.";
      actions = [
        "Registrar pagos de clientes",
        "Consultar estado de órdenes",
      ];
      break;
    case "delivery": // equivale a repartidor
      title = "Bienvenido, Repartidor";
      description = "Consulta tus entregas asignadas y actualiza el estado de tus órdenes.";
      actions = [
        "Ver órdenes asignadas para entrega",
        "Actualizar estado de entrega",
        "Reportar incidencias en entregas",
      ];
      break;
    case "cook": // equivale a cocinero
      title = "Hola, Cocinero";
      description = "Visualiza las órdenes para preparar y controla el estado en tiempo real.";
      actions = [
        "Ver órdenes para preparar",
        "Actualizar estado de preparación",
        "Solicitar ingredientes o insumos",
      ];
      break;
    default:
      title = "Bienvenido";
      description = "Accede a tus funciones según tu rol asignado.";
      actions = ["Consultar información general"];
  }

  return (
    <main className="max-w-4xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Qué puedes hacer</h2>
        <ul className="list-disc list-inside text-gray-700">
          {actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-medium mb-2">Tu información</h2>
        <ul className="text-gray-700">
          <li><strong>Nombre:</strong> {name}</li>
          <li><strong>Email:</strong> {email}</li>
          <li><strong>Rol:</strong> {role || "No definido"}</li>
        </ul>
      </section>
    </main>
  );
}

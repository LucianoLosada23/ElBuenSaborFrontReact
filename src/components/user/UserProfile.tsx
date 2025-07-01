import { useEffect, useState } from "react";
import { getClientProfile } from "../../services/user/client";

type ClientProfile = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  born_date: string;
  genero: string;
  isActive: boolean;
};

export default function UserProfile() {
  const [userData, setUserData] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getClientProfile();
        setUserData(data);
      } catch (e) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Usa la imagen del usuario si existe, si no, una por defecto
  const imagePreview = "/user2.jpg";

  if (loading) {
    return (
      <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12 text-center">
        Cargando perfil...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12 text-center">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12">
      <div className="grid grid-cols-[35%_1fr] gap-12 items-start">
        {/* Lado izquierdo (imagen + título) */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold mb-6">Perfil de Usuario</h2>
          <img
            src={imagePreview}
            alt="Profile"
            width={220}
            height={220}
            className="rounded-full border-4 border-gray-200"
          />
        </div>

        {/* Información del usuario */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.lastname}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.phone}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.email}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha de Nacimiento
            </label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.born_date}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Género</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.genero}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Activo</label>
            <div className="w-full border-b-2 border-zinc-500 py-1">
              {userData.isActive ? "Sí" : "No"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

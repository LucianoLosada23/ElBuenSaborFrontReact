import { Link } from "react-router-dom";
import { useUIState } from "../../hooks/ui/useUIState";
import Modal from "../ui/Modal";

export default function IsLogin() {
  const { toggle, isLoginModal } = useUIState();

  return (
    <>
      <Modal
        isOpen={isLoginModal}
        onClose={() => toggle("isLoginModal")}
        title={""}
      >
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="alert.svg" alt="alerta" width={200} height={200} />
          <h3 className="font-semibold text-2xl">
            No tienes un usuario registrado
          </h3>
          <div className="flex flex-col justify-center items-center py-10 gap-6 border-t border-gray-400">
            <h4>Por favor inicia sesion para continuar con tu compra</h4>
            <Link
              to="/register"
              className="w-full py-3 bg-principal cursor-pointer text-center text-white rounded-full shadow-md hover:bg-principal/80 transition-colors duration-200 font-semibold text-lg"
            >
              Registrarme
            </Link>
            {/* Enlace a iniciar sesión */}
            <p className="text-sm text-center mt-4">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-blue-500 underline font-medium">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

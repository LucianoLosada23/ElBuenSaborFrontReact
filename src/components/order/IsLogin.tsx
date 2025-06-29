import { Link } from "react-router-dom";
import { useUIState } from "../../hooks/ui/useUIState";
import Modal from "../ui/Modal";

export default function IsLogin() {
  const { toggle, isLoginModal } = useUIState();

  return (
    <Modal
      isOpen={isLoginModal}
      onClose={() => toggle("isLoginModal")}
      title=""
    >
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <img 
          src="alert.svg" 
          alt="alerta" 
          className="w-32 h-32 sm:w-40 sm:h-40"
        />
        <h3 className="font-semibold text-xl sm:text-2xl text-center">
          No tienes un usuario registrado
        </h3>
        
        <div className="flex flex-col justify-center items-center py-6 sm:py-8 gap-4 sm:gap-6 w-full border-t border-gray-200">
          <h4 className="text-sm sm:text-base text-center text-gray-600">
            Por favor inicia sesión para continuar con tu compra
          </h4>
          
          <Link
            to="/register"
            className="w-full max-w-xs py-3 bg-principal cursor-pointer text-center text-white rounded-full shadow-md hover:bg-principal/90 transition-colors duration-200 font-medium sm:font-semibold text-base sm:text-lg"
            onClick={() => toggle("isLoginModal")}
          >
            Registrarme
          </Link>
          
          <p className="text-xs sm:text-sm text-center text-gray-500 mt-2">
            ¿Ya tienes cuenta?{" "}
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-700 underline font-medium"
              onClick={() => toggle("isLoginModal")}
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
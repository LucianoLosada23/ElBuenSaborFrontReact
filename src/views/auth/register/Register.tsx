import { useLocation } from "react-router-dom";
import RegisterForm from "../../../components/auth/register/RegisterForm";
import RegisterCompanyForm from "../../../components/auth/register/RegisterCompanyForm";

export default function Register() {
  const location = useLocation()
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {location.pathname === "/register" ? 
        <RegisterForm />
        :
        <RegisterCompanyForm/>
        }
      </div>
    </>
  );
}

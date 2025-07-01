import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/landingCompanies/getCompanies";
import { useNavigate } from "react-router-dom";
import type { CompanyListItem } from "../../types/Company/Company";

export default function ListCompanies() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await getAllCompanies();
      if (res) {
        setCompanies(res);
      }
    };
    fetchCompanies();
  }, []);

  const handleViewCatalog = (companyId: number) => {
    navigate(`/catalogo/${companyId}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-semibold text-gris-oscuro mb-8 text-center">Elegí una compañía</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="p-6 bg-white flex flex-col items-center"
          >
            
            <img
              src={`${company.name}.png`}
              alt={company.name}
              className="w-32 h-32 object-cover mb-4"
            />
          
            <h2 className="text-shadow-gris-oscuro">{company.name}</h2>
            <button
              onClick={() => handleViewCatalog(company.id)}
              className="mt-4 px-4 py-2 bg-principal cursor-pointer rounded-full hover:bg-principal/80 text-white"
            >
              Ver catálogo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

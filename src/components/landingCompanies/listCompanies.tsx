import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/landingCompanies/getCompanies";
import { useNavigate } from "react-router-dom";
import type { Company } from "../../types/Company/Company";

export default function ListCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
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
    navigate(`/company/${companyId}/landing`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Elegí una compañía</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="shadow rounded-lg p-6 bg-white flex flex-col items-center"
          >
            {company.image ? (
              <img
                src={company.image}
                alt={company.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded-full mb-4">
                Sin imagen
              </div>
            )}
            <h2 className="text-lg font-semibold">{company.name}</h2>
            <button
              onClick={() => handleViewCatalog(company.id)}
              className="mt-4 px-4 py-2 bg-principal text-white rounded"
            >
              Ver catálogo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

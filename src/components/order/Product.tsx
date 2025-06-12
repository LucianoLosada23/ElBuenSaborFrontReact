import { useEffect, useState } from "react";
import { ProductPopup } from "./ProductPopUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useProduct } from "../../hooks/useProduct";
import { useUIState } from "../../hooks/ui/useUIState";
import { getAllProduct } from "../../services/admin/product/product";
import type { Product } from "../../types/product/product";

export default function Product() {
  // State
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageChangeTriggered, setIsPageChangeTriggered] = useState(false);

  // Redux hooks
    const { setProduct, product } = useProduct();
    const {toggle} = useUIState()
    const itemsPerPage = 7;

  useEffect(() => {
    const callproducts = async () => {
      const data = await getAllProduct();
      if(data){
        setProducts(data);
      }
    };
    callproducts();
  }, []);

  // Scroll solo si se hizo clic en paginación
  useEffect(() => {
    if (!isPageChangeTriggered) return;

    const element = document.getElementById("product");
    if (element) {
      const yOffset = -0; // ajustá según tu navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setIsPageChangeTriggered(false);
  }, [currentPage, isPageChangeTriggered]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setIsPageChangeTriggered(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setIsPageChangeTriggered(true);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-8" id="product">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map((product) => (
            <div
              key={product.id}
              onClick={() =>{setProduct(product) , toggle("isProductModal")}}
              className="shadow-xs cursor-pointer flex justify-between items-center rounded-md gap-6 px-3 bg-white hover:border"
            >
              <div className="flex flex-col items-start">
                <h2 className="text-[14px] font-medium text-gray-700">
                  {product.title}
                </h2>
                <p className="text-[12px] text-gray-600">
                  {product.description}
                </p>
                <p className="text-[12px] text-gray-600 hover:underline hover:text-black">
                  ver más...
                </p>
                <h3 className="font-bold mt-2">${product.price.toFixed(2)}</h3>
              </div>
              <img src={product.image} loading="lazy" className="w-32 h-32 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 bg-principal text-white rounded disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-principal text-white rounded disabled:opacity-50 cursor-pointer"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {product && <ProductPopup product={product} />}
    </>
  );
}

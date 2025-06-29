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
  const [isLoading, setIsLoading] = useState(true);

  // Redux hooks
  const { setProduct, product } = useProduct();
  const { toggle } = useUIState();
  const itemsPerPage = 6; // Changed to even number for better grid layout

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if (!isPageChangeTriggered) return;

    const element = document.getElementById("product");
    if (element) {
      const yOffset = -20; // Adjust for any fixed headers
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setIsPageChangeTriggered(false);
  }, [currentPage, isPageChangeTriggered]);

  // Pagination logic
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(itemsPerPage)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6" id="product">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setProduct(product);
                toggle("isProductModal");
              }}
              className="group shadow-sm hover:shadow-md cursor-pointer flex flex-col sm:flex-row md:flex-col rounded-lg overflow-hidden bg-white border border-gray-100 hover:border-principal/30 transition-all duration-200"
            >
              <div className="w-full h-40 sm:h-48 md:h-40 lg:h-48 bg-gray-100 flex-shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    alt={product.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4 flex-1">
                <h2 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm sm:text-base font-bold text-principal">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-black transition-colors">
                    Ver más →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {products.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 bg-principal text-white rounded-full disabled:opacity-50 cursor-pointer hover:bg-principal/90 transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm sm:text-base text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 bg-principal text-white rounded-full disabled:opacity-50 cursor-pointer hover:bg-principal/90 transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {product && <ProductPopup product={product} />}
    </>
  );
}
import { useEffect, useState } from "react";
import { ProductPopup } from "./ProductPopUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useProduct } from "../../hooks/useProduct";
import { useUIState } from "../../hooks/ui/useUIState";
import { getProductsByCompany } from "../../services/admin/product/product";
import type { Product } from "../../types/product/product";
import { useCategoryFilter } from "../../hooks/useCategoryFilter"; // ✅ IMPORTANTE

interface ProductProps {
  companyId?: string;
}

export default function Product({ companyId }: ProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChangeTriggered, setIsPageChangeTriggered] = useState(false);

  const { selectedCategoryId } = useCategoryFilter(); // ✅ USO DEL HOOK
  const { setProduct, product } = useProduct();
  const { toggle } = useUIState();
  const itemsPerPage = 7;

  useEffect(() => {
    if (!companyId) return;

    const callproducts = async () => {
      const data = await getProductsByCompany(companyId);
      if (data) setProducts(data);
    };

    callproducts();
  }, [companyId]);

  useEffect(() => {
    if (!isPageChangeTriggered) return;

    const element = document.getElementById("product");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setIsPageChangeTriggered(false);
  }, [currentPage, isPageChangeTriggered]);

  const filteredProducts = selectedCategoryId
    ? products.filter(
        (p) =>
          p.category.id === selectedCategoryId ||
          p.category.parent?.id === selectedCategoryId
      )
    : products;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
      <div className="max-w-7xl mx-auto py-24" id="product">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                const priceWithPromotion =
                  product.promotionalPrice ?? product.price;
                setProduct({ ...product, price: priceWithPromotion });
                toggle("isProductModal");
              }}
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
                <div className="mt-2">
                  {product.promotionalPrice ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-base font-bold text-red-600">
                        ${product.promotionalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <h3 className="font-bold">${product.price.toFixed(2)}</h3>
                  )}
                </div>
              </div>
              {product.image ? (
                <img
                  src={product.image}
                  loading="lazy"
                  className="w-32 h-32 object-cover"
                  alt={product.title}
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  Sin imagen
                </div>
              )}
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

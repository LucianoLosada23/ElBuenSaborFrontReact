import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import { getProducts } from "../../services/ProductService";
import { ProductPopup } from "./ProductPopUp";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const callproducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        callproducts();
    }, []);

    const handleViewMore = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((product) => (
                        <div key={product.id} className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={product.image} className="w-full h-48 object-cover" />
                            <div className="p-4 flex justify-between">
                                <div className="flex flex-col items-start gap-4">
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-700">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="items-end flex flex-col gap-4">
                                    <button
                                        className={
                                            Number(product.time) > 20
                                                ? "text-white bg-amarillo px-3 rounded-full"
                                                : Number(product.time) > 10
                                                ? "text-white bg-principal px-3 rounded-full"
                                                : "text-white bg-verde px-3 rounded-full"
                                        }
                                    >
                                        {`${product.time}min`}
                                    </button>
                                    <button onClick={() => handleViewMore(product)}>
                                        <PlusCircleIcon
                                            width={38}
                                            height={38}
                                            className="cursor-pointer text-gris-oscuro"
                                        />
                                    </button>
                                 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controles de paginación centrados al fondo */}
            <div className="flex justify-center items-center gap-4 mt-8 mb-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <span className="text-gray-700">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>

            {selectedProduct && <ProductPopup product={selectedProduct} onClose={handleClosePopup} />}
        </>
    );
}

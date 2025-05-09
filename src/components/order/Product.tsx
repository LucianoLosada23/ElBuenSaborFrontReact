import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getProducts } from "../../services/ProductService";
import { ProductPopup } from "./ProductPopUp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import { addToProduct } from "../../features/productSlice";

export default function Product() {

    //State
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
   

    //Redux
    const product = useSelector((state : RootState) => state.product.product)
    const dispatch = useDispatch()
      
    const itemsPerPage = 8;

    const callproducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        callproducts();
    }, []);

  
    // Paginación
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
            <div className="max-w-7xl mx-auto mt-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => dispatch(addToProduct(product))}
                            className="shadow-md cursor-pointer flex justify-between items-center hover:border hover:border-black rounded-md gap-6 px-3 bg-white"
                        >
                                <div className="flex flex-col items-start ">
                                    <h2 className="text-[14px] font-medium text-gray-700">{product.name}</h2>
                                    <p className="text-[12px] text-gray-600">{product.description}</p>
                                    <p className="text-[12px] text-gray-600 underline">ver mas..</p>
                                    <h3 className="font-bold mt-2">${product.price.toFixed(2)}</h3>
                                </div>

                                <img src={product.image} className="w-32 h-32" />

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

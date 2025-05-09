import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { getProducts } from "../../services/ProductService";
import { ProductPopup } from "./ProductPopUp";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import { addToProduct } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";

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
            <div className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => dispatch(addToProduct(product))}
                            className="shadow-md cursor-pointer bg-gray-50"
                        >
                            <img src={product.image} className="w-full h-56" />
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex flex-col items-start ">
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-700">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="items-end flex flex-col gap-4">
                                  

                                    <button  className="bg-gray-900 hover:bg-gray-700 p-1" onClick={(e) => {
                                        e.stopPropagation(); // <- Esto evita que se abra el modal
                                        dispatch(addToCart(product));
                                    }}>
                                        <ShoppingCartIcon
                                            width={24}
                                            height={24}
                                            className="cursor-pointer text-white"
                                        />
                                    </button>
                                </div>
                            </div>
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

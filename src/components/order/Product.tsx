import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import { getProducts } from "../../services/ProductService";
import { ProductPopup } from "./ProductPopUp";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Carrito from "./Carrito";
import type { Carrito as CarritoType } from "../../models/Carrito";

export default function Product() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [carrito, setCarrito] = useState<CarritoType[]>(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
      
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const callproducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
          setCarrito(JSON.parse(carritoGuardado));
        }
      }, []);
    
      // Actualizar localStorage cada vez que cambia el carrito
      useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }, [carrito]);

    useEffect(() => {
        callproducts();
    }, []);

    const handleViewMore = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    const addCarrito = (product: Product) => {
        setCarrito((prev) => {
            const existingProduct = prev.find((item) => item.product.id === product.id);
            if (existingProduct) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prev, { product, cantidad: 1 }];
            }
        });

        setIsCartOpen(true)
    };

    const removeCarrito = (product: Product) => {
        setCarrito((prev) =>
            prev.filter((item) => item.product.id !== product.id)
        );
    };

    const increaseQuantity = (product: Product) => {
        setCarrito(prev =>
          prev.map(item =>
            item.product.id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        );
      };
      
      const decreaseQuantity = (product: Product) => {
        setCarrito(prev =>
          prev.map(item =>
            item.product.id === product.id
              ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
              : item
          )
        );
      };

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
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed top-4 right-4 bg-principal text-white px-4 py-2 rounded shadow-lg z-50"
                >
                Ver Carrito
            </button>

            <div className="max-w-7xl mx-auto pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleViewMore(product)}
                            className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                        >
                            <img src={product.image} className="w-full h-48 object-cover" />
                            <div className="p-4 flex justify-between">
                                <div className="flex flex-col items-start gap-4">
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-700">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="items-end flex flex-col gap-4">
                                    <div
                                        className={
                                            Number(product.time) > 20
                                                ? "text-white bg-amarillo px-3 rounded-full"
                                                : Number(product.time) > 10
                                                    ? "text-white bg-principal px-3 rounded-full"
                                                    : "text-white bg-verde px-3 rounded-full"
                                        }
                                    >
                                        {`${product.time}min`}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addCarrito(product);
                                        }}
                                    >
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

            {/* Controles de paginación */}
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
                <Carrito
                    carrito={carrito || []}
                    removeCarrito={removeCarrito}
                    onClose={() => setIsCartOpen(false)}
                    isOpen={isCartOpen}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                />

            {selectedProduct && <ProductPopup product={selectedProduct} onClose={handleClosePopup} />}
        </>
    );
}

import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import { getProducts } from "../../services/ProductService";
import Button from "../ui/Button";
import { ProductPopup } from "./ProductPopUp";


export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


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


  return (
    <>
        <div className="max-w-7xl mx-auto pt-10">   
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
                    <img src={product.image} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-700">${product.price.toFixed(2)}</p>
                        <div className="flex justify-between items-center mt-4">
                            <Button
                                text="Agregar al carrito"
                                width={0.5}
                                height={0.2}
                                size={11}
                            />
                            <button className="bg-gray-400 p-1 rounded-2xl text-white hover:text-black hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleViewMore(product)}>Ver mas</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        {selectedProduct && <ProductPopup product={selectedProduct} onClose={handleClosePopup} />}
    </>

  )
}

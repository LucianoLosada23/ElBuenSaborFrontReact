import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

export default function FacturacionPopUp() {
  const isFacturacionOpen = useAppSelector(
    (state) => state.cart.isFacturacionOpen
  );
  const carrito = useAppSelector((state) => state.cart.cart);
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.product.price * (item.cantidad ?? 1),
    0
  );
  const total = subtotal; //Deberiamos agregar el total + el tipo de envio que va a ser

  useEffect(() => {
    //Desactivar scroll externo
    // Al montar: bloquear scroll
    document.body.style.overflow = "hidden";

    // Al desmontar: restaurar scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-86 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isFacturacionOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <h1>Detalle facturacion</h1>
        <div>
          <h4>Su orden</h4>
          {carrito.map((e) => (
            <div key={e.product.id}>
              <p>{e.product.name}</p>
              <p>{e.product.price}</p>
            </div>
          ))}
          <h6>Subtotal</h6>
          {subtotal}
          <h6>
            Total
            {total}
          </h6>
        </div>
      </div>
    </div>
  );
}

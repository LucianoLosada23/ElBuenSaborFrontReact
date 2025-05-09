import BannerProduct from "../components/order/BannerProduct";
import Carrito from "../components/order/Carrito";
import Category from "../components/order/Category";
import Offer from "../components/order/Offer";
import Product from "../components/order/Product";

export default function Order() {
  return (
    <>
      <section>
        <BannerProduct/>
      </section>
      <section>
        <Offer/>
      </section>
      <section>
        <Category/>
      </section>
      <section>
        <Product/>
      </section>
      <section>
        <Carrito />
      </section>
    </>
  )
}

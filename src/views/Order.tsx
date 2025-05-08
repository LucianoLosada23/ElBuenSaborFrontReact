import BannerProduct from "../components/order/BannerProduct";
import Carrito from "../components/order/Carrito";
import Category from "../components/order/Category";
import Offer from "../components/order/Offer";
import Product from "../components/order/Product";
import SearchProduct from "../components/order/SearchProduct";

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
        <SearchProduct/>
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

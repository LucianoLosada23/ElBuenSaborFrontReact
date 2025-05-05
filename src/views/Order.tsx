import Category from "../components/order/Category";
import Product from "../components/order/Product";
import SearchProduct from "../components/order/SearchProduct";

export default function Order() {
  return (
    <>
      <section>
        <SearchProduct/>
      </section>
      <section>
        <Category/>
      </section>
      <section>
        <Product/>
      </section>
    </>
  )
}

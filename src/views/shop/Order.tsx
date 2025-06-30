import { useParams } from "react-router-dom";
import BannerProduct from "../../components/order/BannerProduct";
import Category from "../../components/order/Category";
import FacturacionPopUp from "../../components/order/FacturacionPopUp";
import Offer from "../../components/order/Offer";
import Product from "../../components/order/Product";

export default function Order() {
  const { companyId } = useParams<{ companyId: string }>();
  return (
    <>
      <section>
        <BannerProduct />
      </section>
      <div className="bg-white">
        <section>
          <Offer />
        </section>
        <section>
          <Category />
        </section>
      </div>
      <section className="bg-white">
        <Product companyId={companyId} />
      </section>
      <FacturacionPopUp />
    </>
  );
}

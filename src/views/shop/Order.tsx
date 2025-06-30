import { useParams } from "react-router-dom";
import Category from "../../components/order/Category";
import FacturacionPopUp from "../../components/order/FacturacionPopUp";
import Product from "../../components/order/Product";

export default function Order() {
  const { companyId } = useParams<{ companyId: string }>();
  return (
    <>
      <div className="bg-white">
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

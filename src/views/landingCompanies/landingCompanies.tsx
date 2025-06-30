import ListCompanies from "../../components/landingCompanies/listCompanies";
import BannerProduct from "../../components/order/BannerProduct";
import Offer from "../../components/order/Offer";

export default function LandingCompanies() {

  return (
    <>
      <section>
        <BannerProduct />
      </section>
       <section>
          <Offer />
        </section>
      <section>
          <ListCompanies />
      </section>
    </>
  );
}
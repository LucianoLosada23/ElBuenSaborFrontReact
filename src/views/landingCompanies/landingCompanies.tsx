import Aboutus from "../../components/landing/Aboutus";
import Contact from "../../components/landing/Contact";
import ListCompanies from "../../components/landingCompanies/listCompanies";

export default function LandingCompanies() {

  return (
    <>
    <section>
        <ListCompanies />
    </section>
      <section>
        <Aboutus />
      </section>
      <section>
        <Contact />
      </section>
    </>
  );
}
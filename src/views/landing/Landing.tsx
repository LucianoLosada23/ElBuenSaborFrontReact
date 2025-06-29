
import Aboutus from "../../components/landing/Aboutus";
import Banner from "../../components/landing/Banner";
import Contact from "../../components/landing/Contact";
import Operation from "../../components/landing/Operation";

export default function Landing() {

  return (
    <>
      <section>
        <Banner />
      </section>
      <section>
        <Operation />
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

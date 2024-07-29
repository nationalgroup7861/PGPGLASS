import BackToTop from "../backToTop";
import PricingPage from "./index";

export const metadata = {
  title: "Pricing - || PGPGPT",
  description: "PGPGPT",
};

const PricingLayout = () => {
  return (
    <>
      <PricingPage />
      <BackToTop />
    </>
  );
};

export default PricingLayout;

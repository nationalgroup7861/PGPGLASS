import BackToTop from "../backToTop";
import PlansBillingPage from "./index";

export const metadata = {
  title: "Plans & Billing - || PGPGPT",
  description: "PGPGPT",
};

const PlansBillingLayout = () => {
  return (
    <>
      <PlansBillingPage />
      <BackToTop />
    </>
  );
};

export default PlansBillingLayout;

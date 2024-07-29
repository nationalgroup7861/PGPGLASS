import BackToTop from "../backToTop";
import HelpFaqPage from "./index";

export const metadata = {
  title: "Help & FAQs - || PGPGPT",
  description: "PGPGPT",
};

const HelpFaqLayout = () => {
  return (
    <>
      <HelpFaqPage />
      <BackToTop />
    </>
  );
};

export default HelpFaqLayout;

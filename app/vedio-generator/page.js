import BackToTop from "../backToTop";
import VedioGeneratorPage from "./index";

export const metadata = {
  title: "Vedio Generator - || PGPGPT",
  description: "PGPGPT",
};

const VedioGeneratorLayout = () => {
  return (
    <>
      <VedioGeneratorPage />
      <BackToTop />
    </>
  );
};

export default VedioGeneratorLayout;

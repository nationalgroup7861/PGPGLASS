import BackToTop from "@/app/backToTop";
import InternalGeneratorPage from "./index";

export const metadata = {
  title: "Internal - || PGPGPT",
  description: "Internal PGPGPT",
};

const InternalGeneratorLayout = () => {
  return (
    <>
      <InternalGeneratorPage />
      <BackToTop />
    </>
  );
};

export default InternalGeneratorLayout;

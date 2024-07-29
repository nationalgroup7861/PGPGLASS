import BackToTop from "@/app/backToTop";
import AlfieGeneratorPage from "./index";

export const metadata = {
  title: "Alfie - || PGPGPT",
  description: "Alfie PGPGPT",
};

const AlfieGeneratorLayout = () => {
  return (
    <>
      <AlfieGeneratorPage />
      <BackToTop />
    </>
  );
};

export default AlfieGeneratorLayout;

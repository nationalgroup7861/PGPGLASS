import BackToTop from "@/app/backToTop";
import GptGeneratorPage from "./index";

export const metadata = {
  title: "Gpt Generator - || PGPGPT",
  description: "PGPGPT",
};

const GptGeneratorLayout = () => {
  return (
    <>
      <GptGeneratorPage />
      <BackToTop />
    </>
  );
};

export default GptGeneratorLayout;

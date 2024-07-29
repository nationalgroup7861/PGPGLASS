import BackToTop from "@/app/backToTop";
import GlassGeneratorPage from "./index";

export const metadata = {
  title: "Glass Gpt Generator - || PGPGPT",
  description: "PGPGPT",
};

const GlassGeneratorLayout = () => {
  return (
    <>
      <GlassGeneratorPage />
      <BackToTop />
    </>
  );
};

export default GlassGeneratorLayout;

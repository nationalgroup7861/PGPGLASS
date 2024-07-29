import BackToTop from "../backToTop";
import TextGeneratorPage from "./index";

export const metadata = {
  title: "Text Generator - || PGPGPT",
  description: "PGPGPT",
};

const TextGeneratorLayout = () => {
  return (
    <>
      <TextGeneratorPage />
      <BackToTop />
    </>
  );
};

export default TextGeneratorLayout;

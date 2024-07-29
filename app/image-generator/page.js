import BackToTop from "../backToTop";
import ImageGeneratorPage from "./index";

export const metadata = {
  title: "Image Generator - || PGPGPT",
  description: "PGPGPT",
};

const ImageGeneratorLayout = () => {
  return (
    <>
      <ImageGeneratorPage />
      <BackToTop />
    </>
  );
};

export default ImageGeneratorLayout;

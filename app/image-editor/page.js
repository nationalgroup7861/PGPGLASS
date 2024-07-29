import BackToTop from "../backToTop";
import ImageEditorPage from "./index";

export const metadata = {
  title: "Image Editor - || PGPGPT",
  description: "PGPGPT",
};

const ImageEditorLayout = () => {
  return (
    <>
      <ImageEditorPage />
      <BackToTop />
    </>
  );
};

export default ImageEditorLayout;

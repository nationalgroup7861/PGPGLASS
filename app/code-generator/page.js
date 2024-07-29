import BackToTop from "../backToTop";
import CodeGeneratorPage from "./index";

export const metadata = {
  title: "Code Generator - || PGPGPT",
  description: "PGPGPT",
};

const CodeGeneratorLayout = () => {
  return (
    <>
      <CodeGeneratorPage />
      <BackToTop />
    </>
  );
};

export default CodeGeneratorLayout;

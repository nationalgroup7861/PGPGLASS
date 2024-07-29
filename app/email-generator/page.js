import BackToTop from "../backToTop";
import EmailGeneratorPage from "./index";

export const metadata = {
  title: "Email Generator - || PGPGPT",
  description: "PGPGPT",
};

const EmailGeneratorLayout = () => {
  return (
    <>
      <EmailGeneratorPage />
      <BackToTop />
    </>
  );
};

export default EmailGeneratorLayout;

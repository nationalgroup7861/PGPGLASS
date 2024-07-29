import BackToTop from "@/app/backToTop";
import ResearchGeneratorPage from "./index";

export const metadata = {
  title: "Research - || PGPGPT",
  description: "Research PGPGPT",
};

const ResearchGeneratorLayout = () => {
  return (
    <>
      <ResearchGeneratorPage />
      <BackToTop />
    </>
  );
};

export default ResearchGeneratorLayout;

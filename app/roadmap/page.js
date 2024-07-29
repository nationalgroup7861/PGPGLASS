import BackToTop from "../backToTop";
import RoadmapPage from "./index";

export const metadata = {
  title: "Roadmap - || PGPGPT",
  description: "PGPGPT",
};

const RoadmapLayout = () => {
  return (
    <>
      <RoadmapPage />
      <BackToTop />
    </>
  );
};

export default RoadmapLayout;

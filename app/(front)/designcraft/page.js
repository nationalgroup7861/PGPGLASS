import BackToTop from "@/app/backToTop";
import DesignCraftPage from "./index";

export const metadata = {
  title: "DesignCraft - || PGPGPT",
  description: "PGPGPT",
};

const DesignCraftLayout = () => {
  return (
    <>
      <DesignCraftPage />
      <BackToTop />
    </>
  );
};

export default DesignCraftLayout;

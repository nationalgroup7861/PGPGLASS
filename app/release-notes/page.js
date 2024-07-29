import BackToTop from "../backToTop";
import ReleaseNotesPage from "./index";

export const metadata = {
  title: "Release Notes - || PGPGPT",
  description: "PGPGPT",
};

const ReleaseNotesLayout = () => {
  return (
    <>
      <ReleaseNotesPage />
      <BackToTop />
    </>
  );
};

export default ReleaseNotesLayout;

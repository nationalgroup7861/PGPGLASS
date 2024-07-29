import BackToTop from "../backToTop";
import ApplicationsPage from "./index";

export const metadata = {
  title: "Applications - || PGPGPT",
  description: "PGPGPT",
};

const ApplicationsLayout = () => {
  return (
    <>
      <ApplicationsPage />
      <BackToTop />
    </>
  );
};

export default ApplicationsLayout;

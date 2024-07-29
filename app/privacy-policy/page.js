import BackToTop from "../backToTop";
import PrivacyPolicyPage from "./index";

export const metadata = {
  title: "Privacy Policy - || PGPGPT",
  description: "PGPGPT",
};

const PrivacyPolicyLayout = () => {
  return (
    <>
      <PrivacyPolicyPage />
      <BackToTop />
    </>
  );
};

export default PrivacyPolicyLayout;

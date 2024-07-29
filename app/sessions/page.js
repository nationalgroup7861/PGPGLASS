import BackToTop from "../backToTop";
import SessionsPage from "./index";

export const metadata = {
  title: "Sessions - || PGPGPT",
  description: "PGPGPT",
};

const SessionsLayout = () => {
  return (
    <>
      <SessionsPage />
      <BackToTop />
    </>
  );
};

export default SessionsLayout;

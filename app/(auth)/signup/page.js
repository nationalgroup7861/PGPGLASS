import BackToTop from "@/app/backToTop";
import SignupPage from "./index";

export const metadata = {
  title: "Sign Up - || PGPGPT",
  description: "PGPGPT",
};

const SignupLayout = () => {
  return (
    <>
      <SignupPage />
      <BackToTop />
    </>
  );
};

export default SignupLayout;

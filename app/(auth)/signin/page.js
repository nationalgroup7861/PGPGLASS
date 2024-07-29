import BackToTop from "@/app/backToTop";
import SigninPage from "./index";

export const metadata = {
  title: "Sign In - || PGPGPT",
  description: "PGPGPT",
};

const SigninLayout = () => {
  return (
    <>
      <SigninPage />
      <BackToTop />
    </>
  );
};

export default SigninLayout;

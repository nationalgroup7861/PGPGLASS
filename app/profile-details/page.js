import BackToTop from "../backToTop";
import ProfileDetailsPage from "./index";

export const metadata = {
  title: "Profile Details - || PGPGPT",
  description: "PGPGPT",
};

const ProfileDetailsLayout = () => {
  return (
    <>
      <ProfileDetailsPage />
      <BackToTop />
    </>
  );
};

export default ProfileDetailsLayout;

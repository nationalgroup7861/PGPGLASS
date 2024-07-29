import BackToTop from "../backToTop";
import NotificationPage from "./index";

export const metadata = {
  title: "Notification - || PGPGPT",
  description: "PGPGPT",
};

const NotificationLayout = () => {
  return (
    <>
      <NotificationPage />
      <BackToTop />
    </>
  );
};

export default NotificationLayout;

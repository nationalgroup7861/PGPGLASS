import BackToTop from "../backToTop";
import ChatExportPage from "./index";

export const metadata = {
  title: "Chat Export - || PGPGPT",
  description: "PGPGPT",
};

const ChatExportLayout = () => {
  return (
    <>
      <ChatExportPage />
      <BackToTop />
    </>
  );
};

export default ChatExportLayout;

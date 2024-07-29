import BackToTop from "./backToTop";
import HomePage from "./home/page";

export const metadata = {
  title: "Home - || PGPGPT",
  description: "PGPGPT",
};

export default function Home() {
  return (
    <main>
      <HomePage />
      <BackToTop />
    </main>
  );
}

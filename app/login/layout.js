import Header from "@/section/home/Header";

export default function LoginLayout({ children }) {
  return (
    <div className=" bg-[url('/5172658.jpg')] w-full overflow-hidden">
      <Header />
      {children}
    </div>
  );
}

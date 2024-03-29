"use client";
import { ApiProvider } from "@/context/ApiContext";
import store from "@/store";
import "flatpickr/dist/themes/light.css";
import "leaflet/dist/leaflet.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "./(back)/admin/scss/app.scss";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {


  return (
    <html lang="en" className="h-full">
      <body className="font-inter h-full custom-tippy dashcode-app"   >
        <Provider store={store}>
          <ApiProvider>{children}</ApiProvider>
        </Provider>
      </body>
    </html>
  );
}

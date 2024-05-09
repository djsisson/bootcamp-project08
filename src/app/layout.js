import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/Header/Header";
import Footer from "./ui/Footer/Footer";
import Sidebar from "./ui/SideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next JS Guestbook",
  description: "Next JS Guestbook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <Sidebar></Sidebar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}

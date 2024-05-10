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
        <div className="flex flex-col gap-4" >
          <Header></Header>
          
          <div className="flex gap-4 relative"><Sidebar></Sidebar>{children}</div>
          
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

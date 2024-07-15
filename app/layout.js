import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "रक्त",
  description: "Blood Donation Application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme='autumn'>
        <body className={`${inter.className}`}>
          <Header />
          {children}
          <Toaster
            position="top-center"
            reverseOrder={true}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

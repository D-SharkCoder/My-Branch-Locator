import React, { type ReactNode } from "react";
import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";

type LayoutProps = {
  children: ReactNode;
  props?: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation logo="/branch-locator.svg" />
        <div className="flex-1 p-4 xl:w-[1300px] xl:mx-auto">
          {children}
        </div>
      <Footer />
    </main>
  );
};

export default Layout;

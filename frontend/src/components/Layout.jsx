import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="content flex-col items-center justify-center font-medium">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      {/* Wrap all routes with Layout */}
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />

          {/* Authenticated Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
            </>
          ) : (
            <>
              {/* Guest Routes */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

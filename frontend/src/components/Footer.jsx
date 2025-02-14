import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const Footer = () => {
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 800 },
  });

  return (
    <animated.footer
      style={fadeIn}
      className="b-0 border-t border-gray-300 bg-white py-6 font-medium text-gray-800"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">
          {/* About Section */}
          <animated.div
            style={fadeIn}
            className="transition-transform hover:scale-105"
          >
            <h2 className="mb-3 text-xl font-bold text-darkBlue">About Us</h2>
            <p className="text-gray-600">
              Your study notes, accessible anytime, anywhere. Keep your learning
              streamlined and efficient.
            </p>
          </animated.div>

          {/* Quick Links */}
          <animated.div
            style={fadeIn}
            className="transition-transform hover:scale-105"
          >
            <h2 className="mb-3 text-xl font-bold text-darkBlue">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {[
                { label: "About", path: "/about" },
                { label: "FAQ", path: "/faq" },
                { label: "Contact", path: "/contact" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="transition-transform hover:scale-110"
                >
                  <Link
                    to={item.path}
                    className="transition-colors duration-200 hover:text-darkBlue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </animated.div>

          {/* Contact Info */}
          <animated.div
            style={fadeIn}
            className="transition-transform hover:scale-105"
          >
            <h2 className="mb-3 text-xl font-bold text-darkBlue">
              Contact Info
            </h2>
            <ul className="space-y-2">
              {[
                { label: "📞 +91 1234567890", href: "tel:+911234567890" },
                { label: "📞 +91 0987654321", href: "tel:+910987654321" },
                {
                  label: "📧 example@gmail.com",
                  href: "mailto:example@gmail.com",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="transition-transform hover:scale-110"
                >
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-darkBlue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </animated.div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex justify-center space-x-6">
          {[
            { icon: <FaFacebookF />, href: "https://facebook.com" },
            { icon: <FaTwitter />, href: "https://twitter.com" },
            { icon: <FaInstagram />, href: "https://instagram.com" },
            { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-600 transition-transform duration-200 hover:scale-125 hover:text-darkBlue"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MarkNotes. All Rights Reserved.
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;

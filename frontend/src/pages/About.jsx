import React from "react";
import { useSpring, animated } from "react-spring";

const About = () => {
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    from: { opacity: 0, transform: "translateY(20px) scale(0.95)" },
  });

  return (
    <animated.div
      style={fadeIn}
      className="m-5 mt-24 flex flex-col items-center rounded-xl bg-white p-5 shadow-2xl ring-2 ring-darkBlue lg:flex-row"
    >
      <div className="grid h-full w-full place-content-center">
        <img
          src="./aboutUs.svg"
          alt="About Us"
          className="w-[300px] transition-transform hover:scale-105 sm:w-[400px] md:w-[450px] lg:w-[600px]"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
        {[
          {
            title: "About Us",
            text: "Welcome to MArkNoteS, the ultimate hub for students to seamlessly share and access educational resources. Our platform is designed with a singular purpose – to make the exchange of study materials as effortless as possible, fostering a collaborative and enriching academic experience for students across colleges.",
          },
          {
            title: "Who We Are",
            text: "MArkNoteS is more than just a website; it's a community-driven initiative fueled by the passion for learning. Founded by a group of dedicated students, our platform is a testament to the belief that education should be a collective journey. Our team comprises tech enthusiasts, educators, and creative minds, all united in the mission to enhance the learning landscape.",
          },
          {
            title: "Our Mission",
            text: "At MArkNoteS, our mission is clear: to empower students by providing a centralized platform where knowledge knows no boundaries. We aim to break down the barriers to academic success, making valuable study materials accessible to all.",
          },
        ].map((section, index) => (
          <animated.div
            key={index}
            style={fadeIn}
            className="w-full max-w-2xl rounded-lg bg-gradient-to-br from-gray-50 to-gray-200 p-5 text-center shadow-lg ring-1 ring-darkBlue transition-transform hover:scale-105"
          >
            <h1 className="relative mx-auto w-fit text-2xl font-bold text-darkBlue after:mt-1 after:block after:h-1 after:w-2/3 after:bg-darkBlue lg:text-4xl">
              {section.title}
            </h1>
            <p className="mt-3 text-[15px] text-gray-700 lg:text-[17px]">
              {section.text}
            </p>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
};

export default About;

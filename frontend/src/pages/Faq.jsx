import React from "react";
import { useSpring, animated } from "react-spring";
import "./../index.css";
const Faq = () => {
  const faqs = [
    {
      question: "What is MarkNotes?",
      answer:
        "MarkNotes is an online platform designed to facilitate the sharing and access of educational resources among college students. It allows users to upload and download study materials such as notes, presentations, and study guides.",
    },
    {
      question: "How do I get started with MarkNotes?",
      answer:
        "To get started, simply create an account on our platform. Once registered, you can start uploading your study materials or explore and download resources shared by other students.",
    },
    {
      question: "Is MarkNotes free to use?",
      answer:
        "Yes, MarkNotes is free to use. We believe in making education accessible to everyone, and our platform is open to all students without any subscription fees.",
    },
    {
      question: "Are my documents secure on MarkNotes?",
      answer:
        "Absolutely. We prioritize the security and privacy of your documents. MarkNotes employs advanced encryption and security measures to ensure the confidentiality of your uploaded materials.",
    },
    {
      question: "Can I upload any type of document on MarkNotes?",
      answer:
        "Yes, you can upload a variety of document types, including PDFs, Word documents, PowerPoint presentations, and more. Our platform is designed to accommodate a range of study materials.",
    },
    {
      question: "How can I search for specific study materials on MarkNotes?",
      answer:
        "Use the search bar on the platform to look for specific study materials. You can enter keywords, subjects, or topics to find relevant documents quickly.",
    },
    {
      question:
        "Can I collaborate with other students on projects using MarkNotes?",
      answer:
        "Absolutely. MarkNotes offers real-time collaboration tools, allowing you to work on group projects and assignments with your peers. Share, edit, and collaborate seamlessly.",
    },
    {
      question: "Is there a limit to the file size I can upload?",
      answer:
        "Currently, there is a file size limit for uploads. Please refer to the platform's guidelines for specific details on file size limitations.",
    },
    {
      question: "How can I provide feedback on a document?",
      answer:
        "Each document on MarkNotes comes with a feedback and rating section. You can share your thoughts, ask questions, or provide feedback on the quality of the material.",
    },
  ];

  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="mt-20 flex items-center justify-center p-8 font-medium sm:p-4">
      <animated.div
        style={fadeIn}
        className="relative w-full max-w-[1550px] overflow-hidden rounded-2xl border border-gray-300 bg-white p-8 shadow-2xl  sm:p-4"
      >
        {/* Floating Decorative Elements */}
        <div className="absolute -right-[20px] -top-[20px] h-[80px] w-[80px] animate-float rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.5] blur-xl"></div>
        <div className="absolute -bottom-[20px] -left-[20px] h-[80px] w-[80px] animate-float-reverse rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.5] blur-xl"></div>

        {/* Header */}
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-wide text-darkBlue">
          Frequently Asked Questions
        </h1>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item, i) => (
            <animated.div
              key={i}
              style={useSpring({
                opacity: 1,
                transform: "translateY(0px)",
                from: { opacity: 0, transform: "translateY(20px)" },
                delay: i * 100,
              })}
              className="transform rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Question Icon */}
              <div className="mb-4 flex items-center">
                <h1 className="text-xl font-semibold text-darkBlue">
                  {item.question}
                </h1>
              </div>

              {/* Answer */}
              <p className="text-sm leading-relaxed text-gray-600">
                {item.answer}
              </p>
            </animated.div>
          ))}
        </div>

        {/* Additional Decoration */}
        <div className="animate-float-slow absolute -left-[100px] -top-[100px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.2] blur-3xl"></div>
        <div className="animate-float-reverse-slow absolute -bottom-[100px] -right-[100px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.2] blur-3xl"></div>
      </animated.div>
    </div>
  );
};

export default Faq;

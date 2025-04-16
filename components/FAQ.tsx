import { faqs } from "@/constants/data";
import Image from "next/image";

const FAQ = () => {
  return (
    <>
      {/* faq */}
      <div className="bg-[#0a0a23] text-white py-12 px-6 flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <button className="bg-[#1c1c3a] text-white text-sm px-4 py-1 rounded-full mb-2">
            Your Ask
          </button>
          <h2 className="text-[30px] md:text-[46px] font-semibold">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-200 mt-2">
            Need something cleared up? Here are our most frequently asked
            questions.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="mb-3 bg-white text-black rounded-lg"
            >
              <summary className="px-5 py-4 font-medium cursor-pointer flex justify-between items-center">
                {faq.question}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                  >
                    <path
                      d="M1.30811 1.49268L7.30811 7.49268L13.3081 1.49268"
                      stroke="#667085"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <p
                className="px-5 py-3 border-t rounded-b-lg text-gray-600 transition-all 
              "
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* pro seller */}
      <div className="bg-gradient-to-b p-12 flex justify-center">
        <div className="max-w-3xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row border-2">
          <div className="h-[50%] sm:h-auto sm:w-1/2 overflow-hidden">
            <Image
              draggable={false}
              width={460}
              height={300}
              src="/images/pro-seller.png"
              alt="Pro Seller"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="h-[50%] sm:h-auto sm:w-1/2 p-6 flex flex-col justify-center gap-1">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-primary">
              Become <span className="text-green-600 font-bold">Pro</span>{" "}
              Seller!
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm sm:mt-2">
              Unlock advanced tools to manage your inventory, attract more
              buyers, and automate customer interactions—boosting sales with
              AI-powered efficiency!
            </p>
            <button className="mt-2 sm:mt-4 px-2 sm:px-5 sm:py-2 border-2 border-green-600 text-green-600 rounded-lg flex items-center hover:bg-green-100 transition max-w-[140] sm:max-w-[164px]">
              Start Chart{" "}
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M10.3082 4.08734C11.1415 9.08734 16.9749 10.754 16.9749 10.754M16.9749 10.754C16.9749 10.754 11.1415 12.4207 10.3082 17.4207M16.9749 10.754L3.64152 10.8174"
                    stroke="#019935"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

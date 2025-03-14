import Image from "next/image";
const faqs = [
  {
    question: "Can AI Agent handle multiple customer inquiries at once?",
    answer:
      "Yes! Our AI can handle multiple conversations simultaneously, ensuring quick and efficient responses for every customer.",
  },
  {
    question: "Can I integrate AI Agent with my existing CRM?",
    answer:
      "Yes, our AI Agent supports integration with most major CRM platforms for seamless customer management.",
  },
  {
    question: "How does AI find potential buyers?",
    answer:
      "Our AI uses advanced algorithms to analyze customer behavior and market trends to identify potential buyers.",
  },
  {
    question: "How does the Team Plan work for executive assistants?",
    answer:
      "The Team Plan allows multiple executive assistants to collaborate using shared AI tools for enhanced productivity.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free trial so you can explore our AI Agent's capabilities before making a commitment.",
  },
];

const page = () => {
  return (
    <div className="">
      {/* hero */}
      <div className="flex justify-center">
        <div className="max-w-screen-xl">
          <div className="flex justify-between py-12 px-6 flex-col-reverse md:flex-row md:justify-between gap-12 md:gap-6 md:h-[597px]">
            <div className="max-w-[613px] flex-1">
              <span className="border border-primary-500 py-2 px-6 rounded-xl font-medium text-primary-500">
                Why for Buyers?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[44px]/10 font-semibold my-6">
                Best for Buyers - Find <br /> Your Perfect Car with Ease
              </h2>
              <p className="text-[#787878] w-full mx-auto text-xl mb-12">
                AI Agent is designed to streamline dealership operations by
                automating key tasks—managing inventory, finding potential
                buyers, and providing real-time customer support through
                advanced AI-powered text and voice communication.
              </p>
              <button className="px-6 py-3 text-white bg-primary-500 rounded-lg hover:bg-green-600 flex gap-2 font-bold">
                Find Your Best Car
                <span>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M6.97516 4.82088C10.1968 8.73434 16.082 7.26105 16.082 7.26105M16.082 7.26105C16.082 7.26105 11.8635 11.6211 13.6418 16.3679M16.082 7.26105L4.56666 13.9826"
                      stroke="white"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Image Section */}
            <div className="grid grid-cols-2  md:ml-8 place-items-center flex-1 gap-2">
              <Image
                draggable={false}
                width={300}
                height={300}
                src="/images/buyer-banner-1.png"
                alt="Buyer Banner 1"
                className="rounded-lg shadow-lg mt-auto w-full md:max-w-[253px] max-h-[70%] md:max-h-[382px] min-[160px] md:ml-auto"
              />
              <div className="h-full flex flex-col gap-2 justify-between">
                <Image
                  draggable={false}
                  width={300}
                  height={300}
                  src="/images/buyer-banner-2.png"
                  alt="Buyer Banner 2"
                  className="rounded-lg shadow-lg w-full max-w-[341px] h-full max-h-[70%] md:max-h-[270px]"
                />
                <Image
                  draggable={false}
                  width={300}
                  height={300}
                  src="/images/buyer-banner-3.png"
                  alt="Buyer Banner 3"
                  className="rounded-lg shadow-lg w-full max-w-[341px] flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* discover */}
      <div className="bg-[#06052F] text-white px-8 py-12">
        <div className="flex  justify-center">
          <div className="max-w-screen-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 mb-[56px] md:mb-0">
                <Image
                  draggable={false}
                  className="w-full h-full  max-w-[450px]"
                  src="/images/buyer-discover.svg"
                  width={300}
                  height={200}
                  alt="Buyer Discover banner"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-4">
                  Discover, Compare, and Connect Effortlessly
                </h2>
                <p className="mb-8 text-gray-300">
                  Tezz AI makes car buying simple and stress-free. Whether
                  you&apos;re searching for your first car or your dream
                  upgrade, our intelligent system helps you.
                </p>
                <ul className="space-y-4 max-w-xl">
                  {[
                    "Find Cars Faster: Get personalized recommendations based on your preferences.",
                    "Compare Listings: Easily compare features, prices, and specifications.",
                    "Instant Support: Chat or talk with our AI assistant 24/7 for quick answers.",
                    "Get Alerts: Be the first to know about new listings matching your criteria.",
                    "Simplified Process: From inquiry to closing the deal, we guide you every step of the way.",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="border rounded-full p-[5px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="9"
                          viewBox="0 0 11 9"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.26344 0.228697L3.29678 5.98703L1.71344 4.29536C1.42178 4.02036 0.963444 4.0037 0.63011 4.23703C0.30511 4.4787 0.213444 4.9037 0.413443 5.24536L2.28844 8.29536C2.47178 8.5787 2.78844 8.7537 3.14678 8.7537C3.48844 8.7537 3.81344 8.5787 3.99678 8.29536C4.29678 7.9037 10.0218 1.0787 10.0218 1.0787C10.7718 0.31203 9.86344 -0.362969 9.26344 0.220364V0.228697Z"
                            fill="#EAEBEC"
                          />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* why buyers */}
      <div className="flex justify-center">
        <div className="max-w-screen-xl px-8 py-12">
          <div className="flex gap-6 flex-col-reverse md:flex-row  items-center justify-between">
            <div className="flex-1 ">
              <p className="text-2xl sm:text-3xl md:text-[46px] font-bold ">
                Why Buyers <span className="text-primary-500">Love Teez</span> ?
              </p>
              <p className="my-6 text-gray-primary">
                Teez makes car shopping effortless with instant support via text
                and voice, personalized recommendations, and faster search
                results. Find your dream car quicker, get answers on the go, and
                enjoy a seamless, stress-free buying experience.
              </p>
              <div className="flex flex-col space-y-4 w-full">
                {/* Top Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-green-600 font-bold text-lg">3x</p>
                    <p className="text-gray-600 text-sm">Faster Car Searches</p>
                  </div>
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-black font-bold text-lg">90%</p>
                    <p className="text-gray-600 text-sm">Buyer Satisfaction</p>
                  </div>
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-black font-bold text-lg">50%</p>
                    <p className="text-gray-600 text-sm">More car options</p>
                  </div>
                </div>

                {/* Active Users */}
                <div className="border border-green-500 rounded-lg p-4 flex w-full items-center space-x-4 justify-center">
                  <div className="flex">
                    <Image
                      draggable={false}
                      width={40}
                      height={40}
                      src="/images/user-1.png"
                      alt="User 1"
                      className="w-10 h-10 rounded-full border-white object-cover -ml-3"
                    />
                    <Image
                      draggable={false}
                      width={40}
                      height={40}
                      src="/images/user-2.png"
                      alt="User 2"
                      className="w-10 h-10 rounded-full border-white object-cover -ml-3"
                    />
                    <Image
                      draggable={false}
                      width={40}
                      height={40}
                      src="/images/user-3.png"
                      alt="User 3"
                      className="w-10 h-10 rounded-full border-white object-cover -ml-3"
                    />
                    <Image
                      draggable={false}
                      width={40}
                      height={40}
                      src="/images/user-4.png"
                      alt="User 4"
                      className="w-10 h-10 rounded-full border-white object-cover -ml-3"
                    />
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">100k+</p>
                    <p className="text-gray-600 text-sm">
                      Active Users Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end md:mt-auto">
              <Image
                draggable={false}
                className="w-full h-full  max-w-[450px]"
                src="/images/why-buyers.svg"
                width={300}
                height={200}
                alt="Buyer Discover banner"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* trusted */}
      <div className="flex justify-center">
        <div className="max-w-screen-xl px-8 py-12">
          <div className="flex justify-center">
            <div className="max-w-[848px]">
              <p className="text-2xl sm:text-3xl md:text-[46px] font-bold text-center">
                We are <span className="text-primary-500">Trusted </span>by
                Industry Leaders
              </p>
              <p className="my-6 text-gray-primary  text-center">
                We have earned the trust of industry leaders through our
                unwavering commitment to excellence, innovation, and delivering
                exceptional results.
              </p>
            </div>
          </div>
          {/* logos */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              "/images/youtube.png",
              "/images/facebook.png",
              "/images/google.png",
              "/images/youtube.png",
              "/images/facebook.png",
              "/images/google.png",
              "/images/youtube.png",
              "/images/facebook.png",
              "/images/google.png",
            ].map((logo, index) => (
              <div key={index}>
                <Image
                  draggable={false}
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  width={133}
                  height={44}
                  className="h-full w-auto  min-w-[133px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default page;

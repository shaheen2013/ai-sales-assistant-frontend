import FAQ from "@/components/FAQ";
import Trusted from "@/components/Trusted";
import Image from "next/image";

const page = () => {
  return (
    <div className="">
      {/* hero */}
      <div className="flex justify-center">
        <div className="max-w-screen-xl">
          <div className="flex justify-between py-12 px-6 flex-col-reverse md:flex-row md:justify-between gap-12 md:gap-6 md:h-[597px]">
            <div className="max-w-[613px] flex-1">
              <span className="border border-primary-500 py-2 px-6 rounded-xl font-medium text-primary-500">
                Why best for Dealers?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[44px]/10 font-semibold my-6">
                Best for Dealers - Supercharge Your Sales with AI
              </h2>
              <p className="text-[#787878] w-full mx-auto text-xl mb-12">
                AI Agent is designed to streamline dealership operations by
                automating key tasks—managing inventory, finding potential
                buyers, and providing real-time customer support through
                advanced AI-powered text and voice communication.{" "}
              </p>
              <button className="px-6 py-3 text-white bg-primary-500 rounded-lg hover:bg-green-600 flex gap-2 font-bold">
                Find Best Customers
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
                src="/images/dealer-banner-1.png"
                alt="Buyer Banner 1"
                className="object-cover rounded-lg shadow-lg mt-auto 
                w-full max-w-[253px]
                h-full max-h-[70%] md:max-h-[383px]
                 md:ml-auto "
              />
              <div className="h-full flex flex-col gap-2 justify-between">
                <Image
                  draggable={false}
                  width={300}
                  height={300}
                  src="/images/dealer-banner-2.png"
                  alt="Buyer Banner 2"
                  className="object-cover rounded-lg shadow-lg
                   w-full max-w-[341px] 
                   h-full max-h-[80%] md:max-h-[270px]"
                />
                <Image
                  draggable={false}
                  width={300}
                  height={300}
                  src="/images/dealer-banner-3.png"
                  alt="Buyer Banner 3"
                  className="object-cover rounded-lg shadow-lg w-full md:max-w-[341px] max-h-[127px] md:max-h-[215px]"
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
                  src="/images/buyer-sell.svg"
                  width={300}
                  height={200}
                  alt="Buyer Discover banner"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-4">
                  Sell Smarter, Not Harder
                </h2>
                <p className="mb-8 text-gray-300">
                  AI Agent helps car dealers boost productivity, attract more
                  customers, and close deals faster with intelligent automation
                </p>
                <ul className="space-y-4 max-w-xl">
                  {[
                    "Manage Inventory: Store and organize car details with ease.",
                    "Find Clients: AI-powered lead generation connects you with potential buyers.",
                    "24/7 Customer Support: Our AI handles inquiries via text & voice, even when you're offline.",
                    "Boost Sales Efficiency: Automate follow-ups, schedule appointments, and track performance.",
                    "Team Collaboration: Perfect for dealerships with multiple agents using the Team Plan.",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
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
              <p className="text-2xl sm:text-3xl  md:text-[46px]/10 font-bold ">
                Teez: The Ultimate Tool for{" "}
                <span className="text-primary-500">Car Dealers </span>!
              </p>
              <p className="my-6 text-gray-primary">
                Boost your sales, save time, and engage customers 24/7 with
                Teez. Our AI-driven assistant helps you manage car listings,
                generate leads, and provide real-time support—all through text
                and voice, making your dealership more efficient and profitable.
              </p>
              <div className="flex flex-col space-y-4 w-full">
                {/* Top Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-green-600 font-bold text-lg">40%</p>
                    <p className="text-gray-600 text-sm">
                      Increase in Sales Leads
                    </p>
                  </div>
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-black font-bold text-lg">70%</p>
                    <p className="text-gray-600 text-sm">Time Saved</p>
                  </div>
                  <div className="border border-green-500 rounded-lg p-4 text-center">
                    <p className="text-black font-bold text-lg">2x</p>
                    <p className="text-gray-600 text-sm">Conversion Rate</p>
                  </div>
                </div>

                {/* Active Users */}
                <div className="border border-green-500 rounded-lg p-4 flex w-full items-center space-x-4 justify-center">
                  <div className="flex">
                    {[
                      "/images/brand-1.png",
                      "/images/brand-2.png",
                      "/images/brand-3.png",
                      "/images/brand-4.png",
                    ].map((src, index) => (
                      <Image
                        draggable={false}
                        key={index}
                        width={40}
                        height={40}
                        src={src}
                        alt={`User ${index + 1}`}
                        className="w-10 h-10 rounded-full  object-cover -ml-3 border border-gray-100"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">100+</p>
                    <p className="text-gray-600 text-sm">Reupdated Brand</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end md:mt-auto">
              <Image
                draggable={false}
                className="w-full h-full  max-w-[450px]"
                src="/images/car-deal.svg"
                width={300}
                height={200}
                alt="Buyer Discover banner"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <Trusted />

      <FAQ />
    </div>
  );
};

export default page;

import React from "react";

export const metadata = {
  title: "Notification Dashboard | Teez",
  description: "Dealer Overview",
};

export default function DashboardNotification() {
  return (
    <div className="">
      {/* top */}
      <div className="flex justify-between mb-4">
        {/* left */}
        <div>
          <h3 className="text-gray-400 font-semibold text-xl">
            All Notification
          </h3>
        </div>

        {/* right */}
        <div className="flex gap-4 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 16C13.9142 16 14.25 16.3358 14.25 16.75C14.25 17.1642 13.9142 17.5 13.5 17.5H10.5C10.0858 17.5 9.75 17.1642 9.75 16.75C9.75 16.3358 10.0858 16 10.5 16H13.5ZM16.5 11C16.9142 11 17.25 11.3358 17.25 11.75C17.25 12.1642 16.9142 12.5 16.5 12.5H7.5C7.08579 12.5 6.75 12.1642 6.75 11.75C6.75 11.3358 7.08579 11 7.5 11H16.5ZM19.5 6C19.9142 6 20.25 6.33579 20.25 6.75C20.25 7.16421 19.9142 7.5 19.5 7.5H4.5C4.08579 7.5 3.75 7.16421 3.75 6.75C3.75 6.33579 4.08579 6 4.5 6H19.5Z"
              fill="#5D6679"
            />
          </svg>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.75 3C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25C3 4.45507 4.45507 3 6.25 3H17.75ZM19.5 8.5H4.5V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V8.5ZM7.75 14.5C8.44036 14.5 9 15.0596 9 15.75C9 16.4404 8.44036 17 7.75 17C7.05964 17 6.5 16.4404 6.5 15.75C6.5 15.0596 7.05964 14.5 7.75 14.5ZM12 14.5C12.6904 14.5 13.25 15.0596 13.25 15.75C13.25 16.4404 12.6904 17 12 17C11.3096 17 10.75 16.4404 10.75 15.75C10.75 15.0596 11.3096 14.5 12 14.5ZM7.75 10.5C8.44036 10.5 9 11.0596 9 11.75C9 12.4404 8.44036 13 7.75 13C7.05964 13 6.5 12.4404 6.5 11.75C6.5 11.0596 7.05964 10.5 7.75 10.5ZM12 10.5C12.6904 10.5 13.25 11.0596 13.25 11.75C13.25 12.4404 12.6904 13 12 13C11.3096 13 10.75 12.4404 10.75 11.75C10.75 11.0596 11.3096 10.5 12 10.5ZM16.25 10.5C16.9404 10.5 17.5 11.0596 17.5 11.75C17.5 12.4404 16.9404 13 16.25 13C15.5596 13 15 12.4404 15 11.75C15 11.0596 15.5596 10.5 16.25 10.5ZM17.75 4.5H6.25C5.2835 4.5 4.5 5.2835 4.5 6.25V7H19.5V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5Z"
              fill="#5D6679"
            />
          </svg>
        </div>
      </div>

      {/* notifications */}
      <div className="border border-gray-50 rounded-lg p-4">
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <div key={index} className="mb-6 flex justify-between">
              {/* left */}
              <div className="flex gap-2 items-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="40"
                    height="40"
                    rx="8"
                    fill="#ECF6FE"
                  />
                  <path
                    d="M24.0001 13.9961C28.05 13.9961 31.3568 17.1908 31.4959 21.2451L31.5001 21.4961V25.5931L32.8801 28.7491C32.9492 28.907 32.9848 29.0775 32.9848 29.2499C32.9848 29.9402 32.4252 30.4999 31.7348 30.4999L27.0001 30.5014C27.0001 32.1582 25.657 33.5014 24.0001 33.5014C22.4024 33.5014 21.0965 32.2524 21.0052 30.6776L20.9997 30.4991L16.275 30.4999C16.1036 30.4999 15.9341 30.4646 15.777 30.3964C15.1438 30.1213 14.8534 29.3851 15.1285 28.7519L16.5001 25.594V21.496C16.5007 17.3412 19.8522 13.9961 24.0001 13.9961ZM25.4997 30.4991L22.5001 30.5014C22.5001 31.3298 23.1717 32.0014 24.0001 32.0014C24.7798 32.0014 25.4206 31.4065 25.4932 30.6458L25.4997 30.4991ZM24.0001 15.4961C20.6799 15.4961 18.0006 18.1703 18.0001 21.4961V25.9057L16.6561 28.9999H31.3526L30.0001 25.9067L30.0002 21.5089L29.9965 21.2837C29.8854 18.0503 27.2417 15.4961 24.0001 15.4961Z"
                    fill="#2196F3"
                  />
                </svg>

                <div>
                  <h3 className="text-gray-300 text-sm font-semibold flex gap-1 items-center">
                    Emerson Curtis
                    <span className="font-medium text-sm text-[#CED0D8] mb-[1px]">
                      @curtis
                    </span>
                  </h3>

                  <h4 className="text-sm text-[#8C91A2]">
                    Follow-up Reminder{" "}
                    <span className="font-medium text-gray-300">
                      Leads Section
                    </span>
                  </h4>
                </div>
              </div>

              {/* right */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-[#CED0D8] text-sm font-semibold">1h</div>
                <div className="h-3 w-3 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';

import Picker from '@emoji-mart/react';
import moment from 'moment';
import Image from 'next/image';

interface Message {
  id: string;
  isMe: boolean;
  message: string;
  timestamp: string;
}

interface ChatAppProps {
  isLoading: boolean;
  parent: any;
  message: string;
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  messageRef: React.RefObject<HTMLTextAreaElement | null>;
  messagesRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
  onEmojiClick: (e: any) => void;
  onMessageSend: (e: any) => void;
  selectedDealer: string;
}

export default function ChatApp({
  isLoading,
  message,
  onMessageChange,
  messagesRef,
  messages,
  onEmojiClick,
  onMessageSend,
  selectedDealer,
}: ChatAppProps) {
  return (
    <div className="h-full py-6">
      <div className="flex flex-col h-full max-w-[930px] mx-auto border p-4 rounded-lg bg-white">
        {/* messages */}
        <div className="flex flex-col flex-1">
          {/* header */}
          <header className="flex lg:flex-row flex-col justify-between lg:items-center border-b pt-4 pb-8">
            <div>
              <h2 className="text-gray-[#2B3545] font-semibold lg:mb-0 mb-3">
                Why the car is not starting?
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="icon" className="h-10 w-10">
                <svg
                  className="!h-5 !w-5"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1496 13.3829V16.5607C18.1496 16.9821 17.9822 17.3863 17.6842 17.6842C17.3863 17.9822 16.9821 18.1496 16.5607 18.1496H5.4385C5.0171 18.1496 4.61296 17.9822 4.31498 17.6842C4.01701 17.3863 3.84961 16.9821 3.84961 16.5607V13.3829M7.02739 9.41072L10.9996 13.3829M10.9996 13.3829L14.9718 9.41072M10.9996 13.3829V3.84961"
                    stroke="#2C2F3A"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <Button variant="icon" className="h-10 w-10">
                <svg
                  className="!h-5 !w-5"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.2513 2.97852C6.85339 2.97852 5.51273 3.53383 4.52426 4.52231C3.53579 5.51078 2.98047 6.85144 2.98047 8.24935V14.7641C2.98047 14.9464 3.0529 15.1213 3.18183 15.2502C3.31076 15.3792 3.48563 15.4516 3.66797 15.4516C3.85031 15.4516 4.02517 15.3792 4.1541 15.2502C4.28304 15.1213 4.35547 14.9464 4.35547 14.7641V8.24935C4.35547 7.21611 4.76592 6.22519 5.49653 5.49458C6.22714 4.76397 7.21806 4.35352 8.2513 4.35352H14.6799C14.8622 4.35352 15.0371 4.28108 15.166 4.15215C15.295 4.02322 15.3674 3.84835 15.3674 3.66602C15.3674 3.48368 15.295 3.30881 15.166 3.17988C15.0371 3.05095 14.8622 2.97852 14.6799 2.97852H8.2513Z"
                    fill="#2C2F3A"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.8694 6.22743C13.8823 5.89554 10.8677 5.89554 7.8806 6.22743C7.46724 6.27334 7.08158 6.45776 6.78633 6.75067C6.49108 7.04359 6.30362 7.42778 6.25443 7.84077C5.90217 10.8537 5.90217 13.8974 6.25443 16.9103C6.30362 17.3232 6.49108 17.7074 6.78633 18.0004C7.08158 18.2933 7.46724 18.4777 7.8806 18.5236C10.8515 18.8554 13.8985 18.8554 16.8694 18.5236C17.2828 18.4777 17.6685 18.2933 17.9637 18.0004C18.2589 17.7074 18.4464 17.3232 18.4956 16.9103C18.8479 13.8974 18.8479 10.8537 18.4956 7.84077C18.4464 7.42778 18.2589 7.04359 17.9637 6.75067C17.6685 6.45776 17.2828 6.27334 16.8694 6.22743ZM8.03368 7.59418C10.9028 7.27335 13.8472 7.27335 16.7163 7.59418C16.8209 7.60575 16.9184 7.65221 16.9933 7.72606C17.0681 7.79991 17.1159 7.89684 17.1288 8.00118C17.4694 10.9075 17.4694 13.8436 17.1288 16.7498C17.1159 16.8542 17.0681 16.9511 16.9933 17.025C16.9184 17.0988 16.8209 17.1453 16.7163 17.1568C13.8472 17.4777 10.9028 17.4777 8.03368 17.1568C7.92917 17.1453 7.83161 17.0988 7.75676 17.025C7.68192 16.9511 7.63415 16.8542 7.62118 16.7498C7.2806 13.8436 7.2806 10.9075 7.62118 8.00118C7.63415 7.89684 7.68192 7.79991 7.75676 7.72606C7.83161 7.65221 7.92917 7.60575 8.03368 7.59418Z"
                    fill="#2C2F3A"
                  />
                </svg>
              </Button>

              <Select value={selectedDealer}>
                <SelectTrigger className="h-10 border-gray-50 w-[250px] data-[placeholder]:!text-gray-800">
                  <SelectValue placeholder="Change your Dealer" className="" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="continental-motors">
                      Continental Motors
                    </SelectItem>
                    <SelectItem value="skyline-autohaus">
                      Skyline Autohaus
                    </SelectItem>
                    <SelectItem value="ironclad-motors">
                      Ironclad Motors
                    </SelectItem>
                    <SelectItem value="velocity-garage">
                      Velocity Garage
                    </SelectItem>
                    <SelectItem value="crimson-ridge-motors">
                      Crimson Ridge Motors
                    </SelectItem>
                    <SelectItem value="silverline-dealers">
                      Silverline Dealers
                    </SelectItem>
                    <SelectItem value="northstar-auto-group">
                      NorthStar Auto Group
                    </SelectItem>
                    <SelectItem value="urbancruise-motors">
                      UrbanCruise Motors
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </header>

          {/* message list */}
          <main
            className="overflow-y-auto h-[calc(100vh-380px)] my-6 message-scrollbar"
            ref={messagesRef as unknown as React.RefObject<HTMLElement>}
          >
            {messages.map((item, index) => {
              // if the message is from the user
              if (item.isMe) {
                const time = moment(item.timestamp);
                const now = moment();
                const diffInSeconds = now.diff(time, 'seconds');

                // if the message is less than 1 minute old, show "Just now" or else show the time with format "hh:mm A"
                const displayTime =
                  diffInSeconds < 60 ? 'Just now' : time.format('hh:mm A');

                return (
                  <div key={index} className="mb-6 mr-3 flex justify-end">
                    <div className="max-w-[80%]">
                      {/* time */}
                      <div className="text-xs text-end mb-1 text-gray-800">
                        <span className="font-semibold">You</span>,{' '}
                        {displayTime}
                      </div>

                      {/* message */}
                      <div className="bg-[#34AD5D] text-white rounded-xl py-2 px-4 relative">
                        {item.message}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="29"
                          viewBox="0 0 19 29"
                          fill="none"
                          className="absolute bottom-[1px] right-[-5px]"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.4471 0C14.4471 0 13.9575 13.7671 15.0001 20.2907C15.5786 23.9098 17.054 25.5836 18.2532 26.3565C18.6843 26.6344 18.7254 27.5241 18.2326 27.6666C15.3485 28.5005 9.29904 29.3369 2.83218 24.6971C-6.15473 18.2491 14.4471 0 14.4471 0Z"
                            fill="#34AD5D"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              }

              // if the message is from the opponent
              return (
                <div key={index} className="flex items-start gap-3 mb-6">
                  <div className="flex-shrink-0 mt-1">
                    <Image
                      src="https://dummyimage.com/50x50"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-sm text-gray-500 font-medium">Teez</h2>
                    {!isLoading ? (
                      <p
                        className="max-w-[70%] p-3 rounded-lg bg-[#F3F4F5] text-gray-400"
                        style={{
                          wordWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                        dangerouslySetInnerHTML={{ __html: item.message }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-start gap-3 mb-6">
                <div className="flex-shrink-0 mt-1">
                  <Image
                    src="https://dummyimage.com/50x50"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-sm text-gray-500 font-medium">Teez</h2>
                  <div className="max-w-[70%] p-3 rounded-lg bg-[#F3F4F5] flex space-x-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></span>
                    <span
                      className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* message input */}
        <form onSubmit={onMessageSend}>
          <div className="bg-[#F3F4F5] rounded-xl p-3 flex justify-between">
            {/* left */}
            <div className="flex flex-col flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => onMessageChange(e)}
                placeholder="Type your message..."
                className="bg-transparent text-sm mb-3 w-full outline-none"
              />

              {/* bottom */}
              <div className="flex items-center gap-2">
                {/* files */}
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                    onClick={() => window.alert('File Upload Coming soon!')}
                  >
                    <path
                      d="M14.9993 10.8307H10.8327V14.9974C10.8327 15.2184 10.7449 15.4304 10.5886 15.5867C10.4323 15.7429 10.2204 15.8307 9.99935 15.8307C9.77834 15.8307 9.56637 15.7429 9.41009 15.5867C9.25381 15.4304 9.16602 15.2184 9.16602 14.9974V10.8307H4.99935C4.77834 10.8307 4.56637 10.7429 4.41009 10.5867C4.25381 10.4304 4.16602 10.2184 4.16602 9.9974C4.16602 9.77638 4.25381 9.56442 4.41009 9.40814C4.56637 9.25186 4.77834 9.16406 4.99935 9.16406H9.16602V4.9974C9.16602 4.77638 9.25381 4.56442 9.41009 4.40814C9.56637 4.25186 9.77834 4.16406 9.99935 4.16406C10.2204 4.16406 10.4323 4.25186 10.5886 4.40814C10.7449 4.56442 10.8327 4.77638 10.8327 4.9974V9.16406H14.9993C15.2204 9.16406 15.4323 9.25186 15.5886 9.40814C15.7449 9.56442 15.8327 9.77638 15.8327 9.9974C15.8327 10.2184 15.7449 10.4304 15.5886 10.5867C15.4323 10.7429 15.2204 10.8307 14.9993 10.8307Z"
                      fill="#019935"
                    />
                  </svg>
                </div>

                {/* emoji */}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                      >
                        <path
                          d="M9.99935 1.66602C14.6018 1.66602 18.3327 5.39685 18.3327 9.99935C18.3327 14.6018 14.6018 18.3327 9.99935 18.3327C5.39685 18.3327 1.66602 14.6018 1.66602 9.99935C1.66602 5.39685 5.39685 1.66602 9.99935 1.66602ZM9.99935 3.33268C8.23124 3.33268 6.53555 4.03506 5.2853 5.2853C4.03506 6.53555 3.33268 8.23124 3.33268 9.99935C3.33268 11.7675 4.03506 13.4632 5.2853 14.7134C6.53555 15.9636 8.23124 16.666 9.99935 16.666C11.7675 16.666 13.4632 15.9636 14.7134 14.7134C15.9636 13.4632 16.666 11.7675 16.666 9.99935C16.666 8.23124 15.9636 6.53555 14.7134 5.2853C13.4632 4.03506 11.7675 3.33268 9.99935 3.33268ZM12.3327 11.5468C12.4104 11.4684 12.503 11.4062 12.605 11.3639C12.707 11.3215 12.8164 11.2999 12.9268 11.3002C13.0372 11.3005 13.1465 11.3227 13.2483 11.3657C13.35 11.4086 13.4423 11.4713 13.5196 11.5501C13.5969 11.629 13.6578 11.7224 13.6986 11.825C13.7395 11.9276 13.7596 12.0373 13.7577 12.1477C13.7558 12.2581 13.732 12.3671 13.6877 12.4682C13.6433 12.5694 13.5793 12.6607 13.4993 12.7368C12.5657 13.6545 11.3084 14.1678 9.99935 14.166C8.69025 14.1678 7.43301 13.6545 6.49935 12.7368C6.34521 12.5813 6.25846 12.3714 6.25785 12.1525C6.25725 11.9335 6.34284 11.7231 6.49612 11.5668C6.6494 11.4104 6.85806 11.3207 7.07698 11.317C7.2959 11.3132 7.50749 11.3958 7.66602 11.5468C8.28817 12.159 9.12654 12.5012 9.99935 12.4993C10.9077 12.4993 11.7302 12.1368 12.3327 11.5468ZM7.08268 6.66602C7.4142 6.66602 7.73215 6.79771 7.96657 7.03213C8.20099 7.26655 8.33268 7.5845 8.33268 7.91602C8.33268 8.24754 8.20099 8.56548 7.96657 8.7999C7.73215 9.03432 7.4142 9.16602 7.08268 9.16602C6.75116 9.16602 6.43322 9.03432 6.1988 8.7999C5.96438 8.56548 5.83268 8.24754 5.83268 7.91602C5.83268 7.5845 5.96438 7.26655 6.1988 7.03213C6.43322 6.79771 6.75116 6.66602 7.08268 6.66602ZM12.916 6.66602C13.2475 6.66602 13.5655 6.79771 13.7999 7.03213C14.0343 7.26655 14.166 7.5845 14.166 7.91602C14.166 8.24754 14.0343 8.56548 13.7999 8.7999C13.5655 9.03432 13.2475 9.16602 12.916 9.16602C12.5845 9.16602 12.2666 9.03432 12.0321 8.7999C11.7977 8.56548 11.666 8.24754 11.666 7.91602C11.666 7.5845 11.7977 7.26655 12.0321 7.03213C12.2666 6.79771 12.5845 6.66602 12.916 6.66602Z"
                          fill="#7E8AAD"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <Picker onEmojiSelect={onEmojiClick} theme="light" />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* right */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-1 cursor-pointer"
                onClick={onMessageSend}
              >
                <path
                  d="M2.08722 1.08139C1.49322 0.784389 0.834721 1.34939 1.03772 1.98189L2.46672 6.42339C2.49482 6.5107 2.54639 6.5886 2.61579 6.64857C2.68519 6.70854 2.76976 6.74826 2.86022 6.76339L8.79472 7.75289C9.07322 7.79939 9.07322 8.19939 8.79472 8.24589L2.86072 9.23489C2.77016 9.24993 2.6855 9.28962 2.616 9.34959C2.5465 9.40956 2.49486 9.48751 2.46672 9.57489L1.03772 14.0179C0.834221 14.6504 1.49272 15.2154 2.08722 14.9184L14.5842 8.67089C15.1372 8.39439 15.1372 7.60589 14.5842 7.32889L2.08722 1.08139Z"
                  fill="#019935"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

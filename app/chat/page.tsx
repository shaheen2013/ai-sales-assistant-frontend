"use client";

import moment from "moment";
import Image from "next/image";
import { useRef, useState } from "react";
import Picker from "@emoji-mart/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import Header from "@/components/header";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";

export default function AnonymousChat() {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [message, setMessage] = useState(""); // message input state
  const [messages, setMessages] = useState([
    {
      id: "5151",
      isMe: false,
      message: "Hello! How can I help you?",
      timestamp: "2025-05-07T12:00:00Z",
    },
    {
      id: "5152",
      isMe: true,
      message: "I need help with my order.",
      timestamp: "2025-05-07T12:01:15Z",
    },
    {
      id: "5153",
      isMe: false,
      message: "Sure! Can you provide your order ID?",
      timestamp: "2025-05-07T12:02:05Z",
    },
    {
      id: "5154",
      isMe: true,
      message: "It's 123456.",
      timestamp: "2025-05-07T12:02:45Z",
    },
    {
      id: "5155",
      isMe: false,
      message: "Thank you! Let me check that for you.",
      timestamp: "2025-05-07T12:03:10Z",
    },
    {
      id: "5156",
      isMe: true,
      message: "I appreciate it!",
      timestamp: "2025-05-07T12:04:00Z",
    },
    {
      id: "5157",
      isMe: false,
      message: "You're welcome! Is there anything else I can assist you with?",
      timestamp: "2025-05-07T12:04:55Z",
    },
    {
      id: "5158",
      isMe: true,
      message: "No, that's all for now.",
      timestamp: "2025-05-07T12:05:20Z",
    },
    {
      id: "5159",
      isMe: false,
      message: "Alright! Have a great day!",
      timestamp: "2025-05-07T12:06:10Z",
    },
    {
      id: "5160",
      isMe: true,
      message: "You too!",
      timestamp: "2025-05-07T12:06:40Z",
    },
    {
      id: "5161",
      isMe: false,
      message: "Thank you!",
      timestamp: "2025-05-07T12:07:05Z",
    },
    {
      id: "5162",
      isMe: true,
      message: "You're welcome!",
      timestamp: "2025-05-07T12:07:30Z",
    },
    {
      id: "5163",
      isMe: false,
      message: "Goodbye!",
      timestamp: "2025-05-07T12:08:00Z",
    },
    {
      id: "5164",
      isMe: true,
      message: "Goodbye!",
      timestamp: "2025-05-07T12:08:20Z",
    },
    {
      id: "5165",
      isMe: false,
      message: "Take care!",
      timestamp: "2025-05-07T12:08:50Z",
    },
    {
      id: "5166",
      isMe: true,
      message: "You too!",
      timestamp: "2025-05-07T12:09:10Z",
    },
    {
      id: "5167",
      isMe: false,
      message: "See you later!",
      timestamp: "2025-05-07T12:09:40Z",
    },
    {
      id: "5168",
      isMe: true,
      message: "See you later!",
      timestamp: "2025-05-07T12:10:00Z",
    },
  ]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmojiClick = (e: any) => {
    // You can update the message state with the selected emoji
    setMessage((prevMessage) => prevMessage + e.native);
  };

  const handleEmailSubmit = () => {
    setEmail("john@example.com");
  };

  const handleMessageSend = (e: any) => {
    e.preventDefault(); // prevent default form submission

    // prevent empty messages
    if (message.trim() === "") return;

    // add message to the list
    const newMessage = {
      id: Date.now().toString(),
      isMe: true,
      message: message,
      timestamp: new Date().toISOString(), // ISO 8601 format
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 200); // simulate a delay for the AI response

    setMessage(""); // clear the message input
  };

  return (
    <div className="h-[calc(100vh)] overflow-hidden flex flex-col justify-center">
      {/* header */}
      <Header />

      {/* middle content */}
      <div className="flex-1">
        {submitted ? (
          <>
            {/* initial UI */}
            <AISalesInitializer
              emailValue={email}
              onEmailChange={handleEmailChange}
              onEmailSubmit={handleEmailSubmit}
            />
          </>
        ) : (
          <>
            {/* chat application */}
            <ChatApp
              message={message}
              onMessageChange={(e: any) => setMessage(e.target.value)}
              onEmojiClick={handleEmojiClick}
              messageRef={messageRef}
              messagesRef={messagesRef}
              messages={messages}
              onMessageSend={handleMessageSend}
              parent={undefined}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface AISalesInitializerProps {
  emailValue: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailSubmit: () => void;
}

function AISalesInitializer({
  emailValue,
  onEmailChange,
  onEmailSubmit,
}: AISalesInitializerProps) {
  return (
    <div className="flex flex-col items-center lg:mt-32">
      <svg
        viewBox="0 0 380 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 lg:w-[380px] lg:h-[54px] w-[250px]"
      >
        <g clipPath="url(#clip0_1929_12711)">
          <path
            d="M39.7421 1.79195C38.2992 0.322859 36.6139 -0.49983 34.5026 0.326532C33.6251 0.407331 32.865 0.704822 32.3473 1.4614C29.8285 3.85234 29.8102 6.77583 32.2996 9.21084C32.7255 9.89397 33.3974 10.1584 34.1391 10.3163C34.9028 10.9076 35.8061 10.713 36.6102 10.5991C38.7251 10.3053 40.1828 9.05291 40.862 7.04394C41.5156 5.11576 41.2108 3.27573 39.7458 1.78827L39.7421 1.79195Z"
            fill="#016D26"
          />
          <path
            d="M13.1036 2.32422C11.8148 0.462153 9.5604 -0.331154 7.36105 0.307899C6.97552 0.370335 6.53492 0.289535 6.3036 0.730262C5.84097 0.833098 5.44442 1.0351 5.1874 1.45379C2.84853 3.82269 2.71268 6.3385 4.78719 8.85065C5.13233 9.40523 5.51419 9.91573 6.24485 9.96348C6.40641 10.272 6.70749 10.2904 6.99755 10.3418C9.47595 11.08 11.712 10.3601 13.1036 8.37319C14.2969 6.67272 14.2932 4.05407 13.1036 2.32422Z"
            fill="#016D26"
          />
          <path
            d="M216.205 27.8859C213.378 27.0889 211.663 25.2709 210.841 22.4503C210.308 20.6176 209.956 18.6968 208.88 16.7539C208.241 18.9135 207.683 20.8012 207.121 22.6927C206.328 25.3554 204.595 27.0742 201.937 27.8602C200.057 28.4185 198.177 28.9804 195.75 29.7039C198.129 30.4458 200.005 31.0591 201.896 31.6137C204.636 32.4181 206.383 34.1736 207.165 36.9208C207.665 38.669 208.201 40.4025 208.825 42.4923C210.055 40.656 210.352 38.8784 210.8 37.2183C211.612 34.2103 213.411 32.407 216.367 31.5439C218.188 31.0114 220.079 30.6258 221.988 29.6231C219.891 28.9914 218.056 28.4074 216.209 27.8859H216.205Z"
            fill="#019935"
          />
          <path
            d="M227.749 37.7584C227.617 37.5343 227.484 37.3066 227.352 37.0826C227.26 35.4556 226.515 34.0195 225.909 32.3301C225.329 37.6372 222.557 40.7333 217.09 41.2034C218.621 42.0114 219.99 42.4594 221.426 42.6982C221.426 42.6908 221.422 42.6871 221.419 42.6835C224.87 44.0203 224.749 47.5866 226.221 50.4182C226.508 44.8357 229.662 42.1069 234.997 41.4898C232.346 40.2632 229.452 40.2044 227.749 37.7584ZM221.415 42.6761C221.415 42.6761 221.411 42.6761 221.408 42.6761C221.331 42.5843 221.265 42.4998 221.198 42.4154C221.29 42.4778 221.371 42.5586 221.415 42.6761Z"
            fill="#019935"
          />
          <path
            d="M226.06 22.4025C226.405 19.8463 227.837 18.5572 230.301 18.1128C227.764 17.6647 226.402 16.2397 226.009 13.7129C225.656 16.3683 224.015 17.5766 221.65 18.1863C224.268 18.4691 225.506 20.0189 226.064 22.4025H226.06Z"
            fill="#019935"
          />
          <path
            d="M193.447 46.9334C193.392 46.8122 193.326 46.7094 193.259 46.6213C193.557 46.0116 193.553 45.4056 193.259 44.7959C186.177 44.7739 179.094 44.7555 172.011 44.7335H168.887C176.84 38.6515 184.396 32.8816 191.934 27.0934C192.606 26.5792 193.583 26.1936 193.274 25.0367C193.406 24.8678 193.461 24.6621 193.454 24.4307C193.447 22.6641 193.436 20.8939 193.454 19.1236C193.48 16.4829 193.366 16.3066 190.792 16.303C178.235 16.2809 165.681 16.2883 153.124 16.303C152.28 16.303 151.402 16.2369 150.671 16.8172C150.664 16.8796 150.66 16.9457 150.657 17.0081C150.271 17.2175 150.492 17.6802 150.348 17.9924C150.37 20.0602 150.495 22.1352 150.378 24.1956C150.29 25.7455 150.826 26.1275 152.32 26.1128C158.885 26.054 165.45 26.1165 172.015 26.1348C172.382 26.1348 172.746 26.1348 173.113 26.1348C173.502 26.4213 173.928 26.5682 174.391 26.5756C166.739 32.4482 159.091 38.3209 151.439 44.1936C151.347 44.2009 151.255 44.2083 151.16 44.212C150.884 44.2891 150.69 44.4287 150.712 44.7519C150.712 44.7519 150.712 44.7519 150.712 44.7555C150.451 44.7078 150.297 44.8033 150.326 45.1412C150.326 45.3909 150.326 45.6443 150.326 45.8941C150.345 47.5358 150.293 49.1848 150.407 50.8192C150.48 51.8512 149.915 52.9824 150.782 53.9226C164.943 53.9373 179.101 53.9557 193.263 53.9704C193.678 51.6345 193.348 49.2803 193.45 46.9334H193.447Z"
            fill="#019935"
          />
          <path
            d="M44.4486 17.1444C43.4719 16.3143 41.3093 16.8542 39.6717 16.8542C26.6004 16.8652 13.5328 16.8909 0.461573 16.913C-0.449009 19.5463 0.30369 22.2605 0.0760446 24.9305C0.0429992 25.3235 -0.0414499 25.8083 0.509306 25.9956C4.64732 26.0066 8.789 26.0985 12.9233 25.9883C14.5022 25.9479 14.8069 26.4657 14.7922 27.9348C14.7188 36.1029 14.7702 44.2711 14.7408 52.4355C14.7372 53.5153 14.851 54.2682 16.1948 53.912C20.8248 53.9156 25.4549 53.923 30.0885 53.9267C30.6283 53.71 30.4888 53.2252 30.4851 52.8248C30.4777 44.3886 30.4557 35.9524 30.441 27.5125C30.4924 27.2884 30.3603 27.2003 30.173 27.1525C29.916 26.0287 30.6173 26.0103 31.4214 26.014C35.2987 26.0287 39.1797 26.036 43.057 26.003C43.6114 25.9993 44.2723 26.3262 44.7276 25.6981C44.7643 24.4788 44.8708 23.2558 44.8157 22.0401C44.7386 20.3543 45.5905 18.114 44.4486 17.1407V17.1444Z"
            fill="#019935"
          />
          <path
            d="M95.35 44.9166C95.2582 44.6448 95.1554 44.6228 95.0452 44.8505C95.0379 44.788 95.0342 44.7293 95.0306 44.6668C94.2742 44.138 93.4003 44.2518 92.5595 44.2518C86.123 44.2445 79.6865 44.2628 73.2463 44.2371C71.1865 44.2298 69.1193 44.3951 67.0632 44.1196C65.9066 43.0325 66.0278 41.6919 66.4794 40.4028C66.9787 38.9851 68.3079 39.4553 69.3286 39.4516C75.0492 39.4149 80.7733 39.4442 86.4938 39.4259C87.3273 39.4259 88.2195 39.5911 88.9208 38.9154C88.9208 38.886 88.9208 38.8566 88.9208 38.8235C88.9245 38.8235 88.9392 38.8235 88.9392 38.8235L89.0971 38.8089C89.1118 38.4783 89.1301 38.1478 89.1448 37.8135C89.1154 35.8927 89.0861 33.9682 89.0567 32.0474C88.6308 31.2284 87.8671 31.592 87.2612 31.5883C80.8541 31.5589 74.4507 31.5405 68.0435 31.5956C66.7621 31.6067 66.2921 31.21 66.3876 29.9282C66.4831 28.6501 66.417 27.3647 66.4206 26.0792C74.972 26.0829 83.5234 26.0866 92.0748 26.0902C92.3869 25.8919 92.9156 26.2518 93.0882 25.6936C93.0956 25.3777 93.1066 25.0619 93.1139 24.746C93.2277 24.6579 93.3342 24.555 93.4297 24.4228C94.0686 22.5754 93.7491 20.6693 93.7344 18.7925C93.7198 16.7799 93.3452 16.5118 91.3368 16.5154C78.5887 16.5228 65.8405 16.5301 53.0887 16.5118C50.3166 16.5081 50.0669 16.677 50.0632 19.461C50.0449 30.0898 50.0485 40.7223 50.0632 51.3512C50.0632 52.251 49.9347 53.2059 50.658 53.9515C65.0805 53.9588 79.5029 53.9662 93.9254 53.9662C94.2852 53.9662 94.6487 53.8964 95.0085 53.8633C95.5666 53.3822 95.2655 52.7432 95.2802 52.1812C95.3426 50.0878 95.35 47.9907 95.3757 45.8935C95.3647 45.5667 95.3537 45.2398 95.339 44.9129L95.35 44.9166ZM66.0975 29.7189C66.215 31.4855 66.6263 31.8417 68.4768 31.9188C67.7425 31.9703 67.0595 31.9299 66.5969 31.5112C66.1122 31.0704 66.0498 30.424 66.0975 29.7189Z"
            fill="#019935"
          />
          <path
            d="M146.034 44.8657C146.034 44.8143 146.03 44.7628 146.027 44.7151C145.285 44.1458 144.411 44.2303 143.567 44.2266C140.945 44.2046 138.323 44.2193 135.702 44.2193C130.459 44.2193 125.215 44.234 119.972 44.2046C119.216 44.2009 118.32 44.4139 117.813 43.5802C116.653 41.6594 117.865 39.5145 120.115 39.5072C125.726 39.4925 131.336 39.5108 136.943 39.4962C137.905 39.4962 138.907 39.6357 139.781 39.0371C139.792 38.9746 139.796 38.9085 139.803 38.8461C140.211 38.6294 140.067 38.1777 140.152 37.8251C140.152 36.2348 140.152 34.6445 140.152 33.0505C140.082 32.742 140.167 32.3711 139.946 32.1213C139.946 32.1177 139.946 32.1103 139.946 32.1066C139.888 32.0001 139.814 31.912 139.726 31.8422C139.583 31.1481 139.124 31.3244 138.65 31.5557H118.485C118.327 31.4382 118.169 31.3611 118.008 31.317C117.975 31.2729 117.942 31.2289 117.912 31.1774C117.358 29.5982 117.332 28.0226 117.938 26.4543C117.964 26.4103 117.993 26.3735 118.023 26.3368C118.177 26.2964 118.331 26.2193 118.485 26.1054C119.153 26.0797 119.818 26.0356 120.486 26.0356C127.543 26.032 134.597 26.0467 141.654 26.0246C144.463 26.0173 144.081 26.4653 144.121 23.4721C144.15 21.4043 144.169 19.3329 144.191 17.2652C143.813 16.6665 143.258 16.8722 142.733 16.9236C142.711 16.8685 142.693 16.8098 142.667 16.7547C141.914 16.3948 141.107 16.5417 140.325 16.5417C132.217 16.5306 124.11 16.5564 116.003 16.527C111.557 16.5086 107.11 16.6482 102.66 16.4462C101.739 16.4021 100.688 16.538 101.291 17.9887C101.482 18.0328 101.61 18.1246 101.562 18.3486C101.133 18.7306 101.254 19.2485 101.254 19.7186C101.25 30.6376 101.247 41.5566 101.261 52.4756C101.261 52.9824 101.026 53.5994 101.665 53.9483C116.418 53.9483 131.171 53.9483 145.928 53.9483C146.614 53.537 146.32 52.8575 146.331 52.2956C146.375 50.0442 146.372 47.7928 146.386 45.5378C146.331 45.277 146.313 44.9905 146.038 44.873L146.034 44.8657Z"
            fill="#019935"
          />
        </g>
        <path
          d="M256.945 40H251.882L261.099 13.8182H266.955L276.185 40H271.122L264.129 19.1875H263.925L256.945 40ZM257.111 29.7344H270.918V33.544H257.111V29.7344ZM284.376 13.8182V40H279.633V13.8182H284.376ZM320.852 22.652H316.071C315.935 21.8679 315.683 21.1733 315.317 20.5682C314.95 19.9545 314.494 19.4347 313.949 19.0085C313.403 18.5824 312.781 18.2628 312.082 18.0497C311.392 17.8281 310.646 17.7173 309.845 17.7173C308.422 17.7173 307.161 18.0753 306.061 18.7912C304.962 19.4986 304.101 20.5384 303.479 21.9105C302.857 23.2741 302.545 24.9403 302.545 26.9091C302.545 28.9119 302.857 30.5994 303.479 31.9716C304.109 33.3352 304.97 34.3665 306.061 35.0653C307.161 35.7557 308.418 36.1009 309.832 36.1009C310.616 36.1009 311.349 35.9986 312.031 35.794C312.722 35.581 313.339 35.2699 313.885 34.8608C314.439 34.4517 314.903 33.9489 315.278 33.3523C315.662 32.7557 315.926 32.0739 316.071 31.3068L320.852 31.3324C320.673 32.5767 320.286 33.7443 319.689 34.8352C319.101 35.9261 318.33 36.8892 317.375 37.7244C316.42 38.5511 315.304 39.1989 314.026 39.6676C312.747 40.1278 311.328 40.358 309.768 40.358C307.467 40.358 305.413 39.8253 303.607 38.7599C301.8 37.6946 300.376 36.1562 299.337 34.1449C298.297 32.1335 297.777 29.7216 297.777 26.9091C297.777 24.0881 298.301 21.6761 299.349 19.6733C300.398 17.6619 301.825 16.1236 303.632 15.0582C305.439 13.9929 307.484 13.4602 309.768 13.4602C311.226 13.4602 312.581 13.6648 313.834 14.0739C315.087 14.483 316.203 15.0838 317.183 15.8764C318.163 16.6605 318.969 17.6236 319.599 18.7656C320.239 19.8991 320.656 21.1946 320.852 22.652ZM329.619 28.4943V40H324.991V13.8182H329.517V23.7003H329.747C330.207 22.5923 330.919 21.7187 331.882 21.0795C332.853 20.4318 334.089 20.108 335.589 20.108C336.953 20.108 338.142 20.3935 339.156 20.9645C340.17 21.5355 340.954 22.3707 341.508 23.4702C342.071 24.5696 342.352 25.9119 342.352 27.4972V40H337.724V28.2131C337.724 26.892 337.383 25.8651 336.701 25.1321C336.028 24.3906 335.082 24.0199 333.863 24.0199C333.045 24.0199 332.312 24.1989 331.664 24.5568C331.025 24.9062 330.522 25.4134 330.156 26.0781C329.798 26.7429 329.619 27.5483 329.619 28.4943ZM352.72 40.3963C351.475 40.3963 350.355 40.1747 349.358 39.7315C348.369 39.2798 347.585 38.6151 347.005 37.7372C346.434 36.8594 346.149 35.777 346.149 34.4901C346.149 33.3821 346.353 32.4659 346.762 31.7415C347.172 31.017 347.73 30.4375 348.437 30.0028C349.145 29.5682 349.941 29.2401 350.828 29.0185C351.723 28.7884 352.647 28.6222 353.602 28.5199C354.752 28.4006 355.686 28.294 356.402 28.2003C357.118 28.098 357.637 27.9446 357.961 27.7401C358.294 27.527 358.46 27.1989 358.46 26.7557V26.679C358.46 25.7159 358.174 24.9702 357.603 24.4418C357.032 23.9134 356.21 23.6491 355.136 23.6491C354.002 23.6491 353.103 23.8963 352.439 24.3906C351.782 24.8849 351.339 25.4687 351.109 26.142L346.788 25.5284C347.129 24.3352 347.691 23.3381 348.475 22.5369C349.26 21.7273 350.218 21.1222 351.352 20.7216C352.485 20.3125 353.738 20.108 355.11 20.108C356.056 20.108 356.998 20.2188 357.936 20.4403C358.873 20.6619 359.73 21.0284 360.505 21.5398C361.281 22.0426 361.903 22.7287 362.372 23.598C362.849 24.4673 363.088 25.554 363.088 26.858V40H358.639V37.3026H358.485C358.204 37.848 357.808 38.3594 357.297 38.8366C356.794 39.3054 356.159 39.6847 355.392 39.9744C354.633 40.2557 353.743 40.3963 352.72 40.3963ZM353.922 36.9957C354.85 36.9957 355.656 36.8125 356.338 36.446C357.02 36.071 357.544 35.5767 357.91 34.9631C358.285 34.3494 358.473 33.6804 358.473 32.956V30.642C358.328 30.7614 358.081 30.8722 357.731 30.9744C357.39 31.0767 357.007 31.1662 356.581 31.2429C356.154 31.3196 355.733 31.3878 355.315 31.4474C354.897 31.5071 354.535 31.5582 354.228 31.6009C353.538 31.6946 352.92 31.848 352.375 32.0611C351.829 32.2741 351.399 32.5724 351.083 32.956C350.768 33.331 350.61 33.8168 350.61 34.4134C350.61 35.2656 350.922 35.9091 351.544 36.3438C352.166 36.7784 352.958 36.9957 353.922 36.9957ZM377.547 20.3636V23.9432H366.258V20.3636H377.547ZM369.045 15.6591H373.673V34.0938C373.673 34.7159 373.767 35.1932 373.954 35.5256C374.15 35.8494 374.406 36.071 374.721 36.1903C375.037 36.3097 375.386 36.3693 375.77 36.3693C376.059 36.3693 376.324 36.348 376.562 36.3054C376.809 36.2628 376.997 36.2244 377.125 36.1903L377.904 39.8082C377.657 39.8935 377.304 39.9872 376.843 40.0895C376.392 40.1918 375.838 40.2514 375.181 40.2685C374.022 40.3026 372.978 40.1278 372.049 39.7443C371.12 39.3523 370.383 38.7472 369.838 37.929C369.301 37.1108 369.037 36.0881 369.045 34.8608V15.6591Z"
          fill="#111928"
        />
        <defs>
          <clipPath id="clip0_1929_12711">
            <rect width="235" height="54" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h4 className="text-[#6B7280] text-center text-[16px] font-normal max-w-3xl lg:mb-12 mb-2 px-6">
        Teezai is where ambition meets expression. Born from the spirit of
        fearless creativity, we empower the next generation to wear their
        vision. Every design, every drop, every detail — it's all about standing
        out, owning your voice, and pushing boundaries.
      </h4>

      <div className="w-full max-w-3xl grid lg:grid-cols-2 grid-cols-1 gap-5 mb-6 px-6">
        {/* select your dealer */}
        <div>
          <label htmlFor="" className="text-gray-700 font-semibold mb-2 block">
            Select your Dealer:
          </label>

          <Select>
            <SelectTrigger className="h-11 border-[#D5D7DA]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="continental-motors">
                  Continental Motors
                </SelectItem>
                <SelectItem value="skyline-autohaus">
                  Skyline Autohaus
                </SelectItem>
                <SelectItem value="ironclad-motors">Ironclad Motors</SelectItem>
                <SelectItem value="velocity-garage">Velocity Garage</SelectItem>
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

        {/* enter your email */}
        <div>
          <label htmlFor="" className="text-gray-700 font-semibold mb-2 block">
            Enter your email:
          </label>

          <Input
            placeholder="Enter your email"
            className="h-11"
            value={emailValue}
            onChange={onEmailChange}
          />
        </div>
      </div>

      <div>
        <Button
          variant="primary"
          className="px-12 h-11 rounded-lg"
          onClick={onEmailSubmit}
        >
          Start Chat
        </Button>
      </div>
    </div>
  );
}

interface Message {
  id: string;
  isMe: boolean;
  message: string;
  timestamp: string;
}

interface ChatAppProps {
  parent: any;
  message: string;
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  messageRef: React.RefObject<HTMLTextAreaElement | null>;
  messagesRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
  onEmojiClick: (e: any) => void;
  onMessageSend: (e: any) => void;
}

function ChatApp({
  message,
  onMessageChange,
  messagesRef,
  messages,
  onEmojiClick,
  onMessageSend,
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

              <Select>
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
                const diffInSeconds = now.diff(time, "seconds");

                // if the message is less than 1 minute old, show "Just now" or else show the time with format "hh:mm A"
                const displayTime =
                  diffInSeconds < 60 ? "Just now" : time.format("hh:mm A");

                return (
                  <div key={index} className="mb-6 mr-3 flex justify-end">
                    <div className="max-w-[80%]">
                      {/* time */}
                      <div className="text-xs text-end mb-1 text-gray-800">
                        <span className="font-semibold">You</span>,{" "}
                        {displayTime}
                      </div>

                      {/* message */}
                      <div className="bg-[#34AD5D] text-white rounded-xl  py-2 px-4 relative">
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
                <div key={index}>
                  {/* time */}
                  {/* <div className="text-xs mb-1 text-gray-800 ml-12">
                    <span className="font-semibold">Dealer</span>, 11:45 AM
                  </div> */}

                  {/* message */}
                  <div className="mb-6 mr-3 flex gap-3">
                    <div>
                      <Image
                        src="https://dummyimage.com/50x50"
                        alt="avatar"
                        width={36}
                        height={36}
                        className="rounded-full h-[36px] w-[36px]"
                      />
                    </div>

                    <div className="">
                      {/* title */}
                      <h2 className="text-gray-300 font-semibold mb-1">Teez</h2>

                      {/* messager */}
                      <h4 className=" text-gray-400">{item.message}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
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
                    onClick={() => window.alert("File Upload Coming soon!")}
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

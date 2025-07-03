"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselItem,
  CarouselContent,
} from "@/components/shadcn/carousel";

import Button from "@/components/button";
import { useDotButton } from "@/components/shadcn/EmblaCarouselDotButton";

export default function LayoutCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { scrollSnaps } = useDotButton(api);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carourselItems = [
    {
      name: "Ronald Richards",
      image: "https://picsum.photos/300/300?random=1",
      role: "Dealership Owner",
      rating: 5,
      text: "The voice and text support feature is a game-changer! Our customers love the quick responses, and we've seen a significant boost in sales.",
    },
    {
      name: "Eleanor Pena",
      image: "https://picsum.photos/300/300?random=2",
      role: "Customer Support Manager",
      rating: 5,
      text: "Using this service has completely transformed our customer engagement. The team loves how intuitive it is, and our response time has never been better.",
    },
    {
      name: "Wade Warren",
      image: "https://picsum.photos/300/300?random=3",
      role: "Sales Director",
      rating: 5,
      text: "We've seen a 30% improvement in lead conversions since we started using the platform. It's reliable, fast, and our clients are impressed with the support.",
    },
    {
      name: "Darlene Robertson",
      image: "https://picsum.photos/300/300?random=4",
      role: "Operations Manager",
      rating: 5,
      text: "The automation features save us hours every week. Our support team is less overwhelmed, and customer satisfaction scores are up across the board.",
    },
    {
      name: "Guy Hawkins",
      image: "https://picsum.photos/300/300?random=5",
      role: "Marketing Specialist",
      rating: 5,
      text: "What really stood out was the seamless integration with our CRM. Everything just works, and we didn't even need training to get started.",
    },
    {
      name: "Kristin Watson",
      image: "https://picsum.photos/300/300?random=6",
      role: "Product Manager",
      rating: 5,
      text: "Absolutely love the dashboard and analytics! It's clear, actionable, and helps us make better business decisions every day.",
    },
    {
      name: "Brooklyn Simmons",
      image: "https://picsum.photos/300/300?random=7",
      role: "Customer Success Lead",
      rating: 5,
      text: "Support has been fantastic. Anytime we had questions, we got quick and helpful responses. Highly recommend for growing teams.",
    },
    {
      name: "Savannah Nguyen",
      image: "https://picsum.photos/300/300?random=8",
      role: "Technical Support Engineer",
      rating: 5,
      text: "This platform helped us scale our support without hiring additional staff. It's efficient, modern, and our customers noticed the difference.",
    },
    {
      name: "Albert Flores",
      image: "https://picsum.photos/300/300?random=9",
      role: "Business Analyst",
      rating: 5,
      text: "From day one, it's been smooth. Setup was fast, and the features are exactly what we needed to streamline our support operations.",
    },
    {
      name: "Courtney Henry",
      image: "https://picsum.photos/300/300?random=10",
      role: "Sales Executive",
      rating: 5,
      text: "We were hesitant at first, but now we can't imagine working without it. It's boosted productivity and brought our team closer to our customers.",
    },
  ];

  return (
    <section className="container py-12">
      <div className="hidden self-end gap-3">
        <Button
          variant="outline-black"
          disabled={current === 1}
          onClick={() => api?.scrollTo(current - 2)}
        >
          <ChevronLeft className="stroke-primary-500 h-6 w-6" />
          Previous
        </Button>

        <Button
          variant="outline-black"
          disabled={current === count}
          onClick={() => api?.scrollTo(current)}
        >
          Next
          <ChevronRight className="stroke-primary-500 h-6 w-6" />
        </Button>
      </div>

      {/* carousel */}
      <div>
        <Carousel
          className="w-full max-w-[450px] mx-auto mb-4"
          setApi={setApi}
          plugins={[autoplay()]}
        >
          <CarouselContent>
            {carourselItems.map((item, index) => (
              <CarouselItem key={index} className=" basis-[100%] select-none">
                <div className="p-6 h-full">
                  {/* header */}
                  <div className="flex justify-center mb-3">
                    <Ratings rating={item.rating} totalStars={5} />
                  </div>

                  <p className="text-[#133240] text-base text-center mb-10">
                    {item.text}
                  </p>

                  <div className="flex items-center justify-center gap-5">
                    <div>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>

                    <div>
                      <h2 className="text-[#101010] text-2xl font-semibold">
                        {item.name}
                      </h2>
                      <h3 className="text-base text-[#6F6F6F] font-medium">
                        {item.role}
                      </h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* dots */}
        <div className="flex justify-center items-center gap-16">
          {/* left */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            className="cursor-pointer"
            onClick={() => api?.scrollPrev()}
          >
            <path
              d="M5.9165 11.2734L0.916504 6.27344L5.9165 1.27344"
              stroke="#535862"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* center */}
          <div className="flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full ${
                  current === index + 1 ? "bg-primary-500" : "bg-primary-100"
                }`}
              />
            ))}
          </div>

          {/* right */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            className="cursor-pointer rotate-180"
            onClick={() => api?.scrollNext()}
          >
            <path
              d="M5.9165 11.2734L0.916504 6.27344L5.9165 1.27344"
              stroke="#535862"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

interface RatingsProps {
  rating: number;
  totalStars?: number;
}

function Ratings({ rating = 5, totalStars = 5 }: RatingsProps) {
  const star = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="#F8A401"
      />
    </svg>
  );

  const borderStar = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z"
        fill="#F8A401"
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-1">
      {/* star */}
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>{index < rating ? star : borderStar}</span>
      ))}
    </div>
  );
}

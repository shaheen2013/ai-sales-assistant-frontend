"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import Button from "@/components/button";
import { useDotButton } from "@/components/shadcn/EmblaCarouselDotButton";

export default function Testimonials() {
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

  const carourseltems = [
    {
      name: "Ronald Richards",
      image: "https://picsum.photos/300/300?random=1",
      rating: 3,
      text: "Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Eleanor Pena",
      image: "https://picsum.photos/300/300?random=2",
      rating: 4,
      text: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit.",
    },
    {
      name: "Wade Warren",
      image: "https://picsum.photos/300/300?random=3",
      rating: 5,
      text: "Laborum fugiat enim veniam consectetur. Magna fugiat sit ut eiusmod. Eu anim pariatur cillum Lorem dolore deserunt.",
    },
    {
      name: "Darlene Robertson",
      image: "https://picsum.photos/300/300?random=4",
      rating: 2,
      text: "Aute fugiat ex est exercitation ut et dolore officia sunt esse. Non nulla ad ullamco labore exercitation elit nostrud.",
    },
    {
      name: "Guy Hawkins",
      image: "https://picsum.photos/300/300?random=5",
      rating: 3,
      text: "Sint ex duis in ad voluptate exercitation laboris. Consectetur magna ex nulla reprehenderit amet anim.",
    },
    {
      name: "Kristin Watson",
      image: "https://picsum.photos/300/300?random=6",
      rating: 5,
      text: "Mollit ex ad tempor nisi fugiat. Dolore anim nisi est incididunt velit officia occaecat pariatur elit.",
    },
    {
      name: "Brooklyn Simmons",
      image: "https://picsum.photos/300/300?random=7",
      rating: 1,
      text: "Exercitation fugiat nulla tempor consequat elit occaecat sit amet. Magna enim laborum amet officia reprehenderit.",
    },
    {
      name: "Savannah Nguyen",
      image: "https://picsum.photos/300/300?random=8",
      rating: 4,
      text: "Quis amet voluptate culpa dolor cillum amet fugiat voluptate deserunt. Laborum ut pariatur id labore do.",
    },
    {
      name: "Albert Flores",
      image: "https://picsum.photos/300/300?random=9",
      rating: 2,
      text: "Nisi id voluptate aliqua elit magna. Sit officia ad reprehenderit non excepteur incididunt voluptate commodo.",
    },
    {
      name: "Courtney Henry",
      image: "https://picsum.photos/300/300?random=10",
      rating: 5,
      text: "Culpa nulla pariatur ullamco veniam nostrud. Duis esse aute cillum pariatur culpa mollit elit incididunt labore.",
    },
  ];

  return (
    <section className="container py-12">
      {/* badge */}
      <div className="mb-4">
        <span className="border border-primary-600 py-2 px-6 rounded-lg text-primary-600 mb-9 inline-flex w-max">
          Testimonials
        </span>
      </div>

      <div className="flex justify-between mb-12">
        {/* left */}
        <div className="lg:w-7/12">
          <h2 className="text-[#3B3B3B] lg:text-5xl text-3xl font-semibold mb-4">
            What Buyers and Dealers Says
          </h2>

          <p className="text-[#6F6F6F] lg:text-xl text-base font-normal">
            Real results, real success! See how AI AutoBot is transforming car
            dealerships by boosting sales, automating tasks, and enhancing
            customer engagement.
          </p>
        </div>

        {/* right */}
        <div className="lg:flex hidden self-end gap-3">
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
      </div>

      {/* carousel */}
      <div>
        <Carousel className="w-full max-w-full" setApi={setApi}>
          <CarouselContent>
            {carourseltems.map((item, index) => (
              <CarouselItem
                key={index}
                className="lg:basis-[30%] basis-[80%] select-none"
              >
                <div className="p-6 border rounded-xl">
                  {/* header */}
                  <div className="flex justify-between mb-3">
                    <Image
                      src={item.image}
                      alt="Testimonial"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />

                    <div>
                      <Ratings rating={item.rating} totalStars={5} />
                    </div>
                  </div>

                  <h2 className="mb-3 text-[#133240] font-medium text-2xl">
                    {item.name}
                  </h2>

                  <p className="text-[#133240] text-base">{item.text}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* dots */}
        <div className="flex justify-center mt-5 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                current === index + 1 ? "bg-[#9BD609]" : "bg-[#E1F3B5]"
              }`}
            />
          ))}
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

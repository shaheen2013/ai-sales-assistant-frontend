"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
} from "@/components/shadcn/carousel";
import Image from "next/image";

export default function Testimonials() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  console.log("current => ", current);
  console.log("count => ", count);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
          <h2 className="text-[#3B3B3B] text-5xl font-semibold mb-4">
            What Buyers and Dealers Says
          </h2>

          <p className="text-[#6F6F6F] text-xl font-normal">
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
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="lg:basis-[30%] basis-[80%]">
                <div className="p-6 border rounded-xl">
                  {/* header */}
                  <div className="flex justify-between mb-3">
                    <Image
                      src="https://dummyimage.com/60x60"
                      alt="Testimonial"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />

                    <div>
                      <Ratings rating={3} totalStars={5} />
                    </div>
                  </div>

                  <h2 className="mb-3 text-[#133240] font-medium text-2xl">
                    Ronald Richards
                  </h2>

                  <p className="text-[#133240] text-base">
                    ullamco est sit aliqua dolor do amet sint. Velit officia
                    consequat duis enim velit mollit. Exercitation veniam
                    consequat sunt nostrud amet.
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
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

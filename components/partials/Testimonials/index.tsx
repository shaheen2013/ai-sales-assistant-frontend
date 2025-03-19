import React from "react";
import Button from "@/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="container py-12 dev">
      {/* badge */}
      <div className="mb-4">
        <span className="border border-primary-600 py-2 px-6 rounded-lg text-primary-600 mb-9 inline-flex w-max">
          Best For Dealers
        </span>
      </div>

      <div className="flex justify-between">
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
          <Button variant="outline-black" disabled>
            <ChevronLeft className="stroke-primary-500 h-6 w-6" />
            Previous
          </Button>

          <Button variant="outline-black">
            Next
            <ChevronRight className="stroke-primary-500 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

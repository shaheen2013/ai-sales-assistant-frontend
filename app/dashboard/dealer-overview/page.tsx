import React from "react";

export const metadata = {
  title: "Dealer Overview | Teez",
  description: "Dealer Overview",
};

export default function DashboardDealerOverview() {
  return (
    <div className="grid grid-cols-12 gap-5">
      {/* left */}
      <div className="col-span-8 pt-2">
        <h2 className="text-xl font-semibold text-gray-400 mb-1">
          Dealers Accusation
        </h2>
        <h4 className="text-sm text-[#707070] mb-4">
          Track and analyze user accusations to identify sources and ensure fair
          resolution.
        </h4>

        {/* dealers chart section */}
        <div className="border rounded-lg p-4">
          <h4 className="text-[#181D27] text-sm font-semibold mb-4">
            How do you acquire Dealers?
          </h4>
          <hr className="mb-4" />
          chart 
        </div>
      </div>

      {/* right */}
      <div className="col-span-4 dev">1</div>
    </div>
  );
}

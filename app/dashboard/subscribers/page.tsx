import React, { Suspense } from "react";
import SubscriberList from "./_partials/SubscriberList";
import DealerStatistics from "./_partials/DealerStatistics";

const page = () => {
  return (
    <Suspense>
      <div className="grid grid-cols-12 gap-5 ">
        <div className="col-span-12 xl:col-span-9 md:order-1 order-2">
          <SubscriberList />
        </div>
        <div className="col-span-12 xl:col-span-3 md:order-2 order-1">
          <DealerStatistics />
        </div>
      </div>
    </Suspense>
  );
};

export default page;

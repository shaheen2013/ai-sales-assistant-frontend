import React, { Suspense } from "react";

import InventoryPage from "./_partials/inventoryPage";

export default function Inventory() {
  return (
    <Suspense>
      <InventoryPage />
    </Suspense>
  );
}

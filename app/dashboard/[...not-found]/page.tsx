// app/dashboard/[...missing]/page.tsx

import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound(); // This will trigger the local `not-found.tsx`
}

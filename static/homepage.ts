export const timelineData = [
  {
    title: "Smart Inventory Management",
    description:
      "Effortlessly store, update, and manage your available cars and their details in one place. AI Agenthelps dealers keep track of inventory, ensuring customers always see the most up-to-date listings.",
  },

  {
    title: "AI-Powered Lead Generation",
    description:
      "No more waiting for customers—AI Agent actively finds potential buyers based on their preferences and browsing behavior. It engages them with personalized conversations, bringing high-quality leads directly to your dealership.",
  },

  {
    title: "Instant AI-Driven Customer Support",
    description:
      "AI Agent answers customer inquiries in real time, providing details about available cars, financing options, and dealership services. Whether via text or voice, it ensures quick and accurate responses—even outside business hours!",
  },

  {
    title: "AI as Your 24/7 Customer Care Representative",
    description:
      "Instead of hiring additional staff, let AI Agent handle customer interactions, schedule test drives, follow up on inquiries, and provide support just like a human agent would. It works around the clock, ensuring no lead is ever lost.",
  },
];

export interface NavigationItem {
  name: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  description: string;
  items: NavigationItem[];
}

export interface NavigationData {
  name: string;
  url: string;
}

export const navigationData: NavigationData[] = [
  {
    name: "Solutions",
    url: "/#solutions",
  },
  {
    name: "How It Helps",
    url: "/#how-it-helps",
  },
  {
    name: "Testimonials",
    url: "/#testimonials",
  },
  {
    name: "Plans",
    url: "/#plans",
  },
  {
    name: "FAQ's",
    url: "/#faqs",
  },
];

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
  buyers: NavigationSection;
  sellers: NavigationSection;
}

export const navigationData: NavigationData = {
  buyers: {
    title: "For Buyers",
    description:
      "Empower Your Learning with Comprehensive Training & Resources",

    items: [
      {
        name: "Buyer Option 1",
        description:
          "Step-by-step visual guides on how to utilize various features of CRM Runner.",
      },
      {
        name: "Buyer Option 2",
        description:
          "Detailed instructional documents available for download to help you navigate and master the CRM at your own pace.",
      },
      {
        name: "Buyer Option 3",
        description:
          "Answers to commonly asked questions to help troubleshoot and clarify routine queries.",
      },
      {
        name: "Buyer Option 4",
        description:
          "Access a library of resources to enhance your CRM skills.",
      },
    ],
  },

  sellers: {
    title: "For Sellers",
    description:
      "Empower Your Learning with Comprehensive Training & Resources",
    items: [
      {
        name: "Option 1",
        description:
          "Step-by-step visual guides on how to utilize various features of CRM Runner.",
      },
      {
        name: "Option 2",
        description:
          "Detailed instructional documents available for download to help you navigate and master the CRM at your own pace.",
      },
      {
        name: "Option 3",
        description:
          "Answers to commonly asked questions to help troubleshoot and clarify routine queries.",
      },
      {
        name: "Option 4",
        description:
          "Access a library of resources to enhance your CRM skills.",
      },
    ],
  },
};

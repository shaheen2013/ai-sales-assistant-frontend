export const timelineData = [
  {
    title: "Answers Every Call — So You Never Miss a Lead",
    description:
      "TEEZ greets every caller, answers key questions about vehicles, hours, and services, and keeps the buyer engaged — even after-hours.",
  },

  {
    title: "Qualifies Buyers and Captures Lead Info",
    description:
      "It gathers the caller's name, contact info, preferences, and vehicle interests — and delivers it straight to your team or CRM.",
  },

  {
    title: "Books Test Drives & Service Appointments Instantly",
    description:
      "Clara handles scheduling through voice or chat, confirms by email or SMS, and frees your team from manual coordination.",
  },

  {
    title: "Transfers Calls to the Right Department",
    description:
      "Whether they need Sales, Finance, or Service, TEEZ gets them there — without putting anyone on hold.",
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

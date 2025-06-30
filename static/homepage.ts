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

interface PricingPlan {
  name: string;
  for: string;
  api_setup_fee: string;
  extras?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Business Plan",
    for: "Mid-size independent dealerships (3-5 reps)",
    api_setup_fee: "$250 one-time (CRM, booking, parts)",
  },
  {
    name: "Enterprise Plan",
    for: "Franchise dealerships with multiple departments/locations",
    api_setup_fee:
      "$250 one-time (includes full CRM, service calendar, parts inventory, and SIP routing support)",
    extras:
      "Multi-location call routing, custom AI voice persona, CRM/DMS integration, priority onboarding",
  },
];

export const plansCommonBenefits = [
  "AI Voice Assistant powered by GPT-4o",
  "Unlimited website chatbot (text)",
  "Call routing via mobile or extension",
  "Dealer branding (custom greetings)",
];

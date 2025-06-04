import { Dealer } from "./dealerType";

export type NewsLetterResponseType = {
  id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  name: string | null;
  subject: string;
  summary: string;
  dealer: Dealer[]; // array of dealer IDs
  files: string[];  // array of file paths
};
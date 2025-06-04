import { Dealer } from "./dealerType";
import { UserDataType } from "./user";

export type NewsLetterResponseType = {
  id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  name: string | null;
  subject: string;
  summary: string;
  dealer: UserDataType[]; // array of dealer IDs
  files: string[];  // array of file paths
};
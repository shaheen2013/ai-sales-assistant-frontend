export interface SupportTicketType {
  id: number;
  dealer: {
    id: number;
    name: string;
    phone: string;
    email: string;
    profile_picture: string | null;
  };
  ticket_id: string;
  subject: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface SupportStatusCountType {
  status_counter: {
    open: number;
    closed: number;
    in_progress: number;
    resolved: number;
  };
}

export interface SupportTicketType {
    id: number,
    dealer: {
        id: number;
        name: string;
        phone: string;
        email: string;
    },
    ticket_id: string,
    subject: string,
    description: string,
    status: string,
    created_at: Date,
    updated_at: Date
}
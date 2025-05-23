export interface NotificationDataType {
    id: number;
    notification_type: string;
    created_at: string;
    updated_at: string;
    message: string;
    object_id: number;
    is_read: boolean;
    is_admin_notification: boolean;
    dealer: null | any;
    content_type: number;
}
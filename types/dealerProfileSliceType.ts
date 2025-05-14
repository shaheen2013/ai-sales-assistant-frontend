export type DealerProfileType = {
  status?: string;
  detail?: string; //for api response
  data: {
    uuid?: string; // readOnly
    email: string; // required, maxLength: 255, minLength: 1
    name: string; // required, maxLength: 255, minLength: 1
    phone_number?: string | null; // maxLength: 20
    profile_picture?: string | null; // readOnly, URI
    about?: string | null;
    is_verified?: boolean;
    street_address?: string;
    zip_code?: string; // maxLength: 255
    city?: string; // maxLength: 255
    state?: string; // maxLength: 255
    country?: string; // maxLength: 255
    lat?: string; // maxLength: 32
    lng?: string; // maxLength: 32
    county?: string; // maxLength: 255
    created_at?: string; // readOnly, ISO datetime string
    updated_at?: string; // readOnly, ISO datetime string

    dealer_details?: {
      business_name?: string | null; // maxLength: 510
      business_email?: string | null; // email, maxLength: 254
      business_summary?: string | null;
      created_at?: string; // readOnly, ISO datetime string
      updated_at?: string; // readOnly, ISO datetime string
    };
  };
};

export type DealerUpdatePasswordType = {
  old_password: string;
  new_password: string;
};

export type NotificationMethodType =
  | 'send_email_notification'
  | 'once_an_hour_at_most'
  | 'never';
export type SignInNotificationMethodType =
  | 'most_secure'
  | 'standard'
  | 'dont_send';

export interface DealerNotificationSettingsType {
  notification_method: NotificationMethodType;
  is_send_tips_and_tricks: boolean;
  is_send_offers_and_promotions: boolean;
  is_send_research_opportunities: boolean;
  is_send_developer_newsletters: boolean;
  is_send_platform_changelogs: boolean;
  sign_in_notification_method: SignInNotificationMethodType;
}

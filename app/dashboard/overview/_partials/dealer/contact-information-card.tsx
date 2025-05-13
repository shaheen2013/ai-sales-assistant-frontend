import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { DealerProfileType } from '@/types/dealer-profile';
import { LinkIcon, Mail, MapPin, Phone } from 'lucide-react';

const ContactInformationCard = ({ data }: { data: DealerProfileType }) => {
  const { email, street_address, city, state, country, phone_number, website } =
    data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
            <Mail className="w-4 h-4 text-[#13c56b]" />
          </div>
          <div>
            <p className="text-gray-400 font-medium">{email}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
            <MapPin className="w-4 h-4 text-[#13c56b]" />
          </div>
          <div>
            <p className="text-gray-400 font-medium">
              {street_address}, {city}, {state}, {country}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
            <Phone className="w-4 h-4 text-[#13c56b]" />
          </div>
          <div>
            <p className="text-gray-400 font-medium">{phone_number}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
            <LinkIcon className="w-4 h-4 text-[#13c56b]" />
          </div>
          <div>
            <p className="text-gray-400 font-medium">
              {website || 'wwww.demowebsite.com'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformationCard;

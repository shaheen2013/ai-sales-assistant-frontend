import { Badge } from '@/components/shadcn/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

const ServicesOfferedSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Services Offered
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-[#ecf6fe] text-[#2196f3] hover:bg-[#ecf6fe]/80 rounded-full px-4 py-1">
            Sales
          </Badge>
          <Badge className="bg-[#fff5eb] text-[#ffb056] hover:bg-[#fff5eb]/80 rounded-full px-4 py-1">
            Financing
          </Badge>
          <Badge className="bg-[#f0edfc] text-[#654ce6] hover:bg-[#f0edfc]/80 rounded-full px-4 py-1">
            Trade-In
          </Badge>
          <Badge className="bg-[#e7f6ef] text-[#13c56b] hover:bg-[#e7f6ef]/80 rounded-full px-4 py-1">
            Maintenance
          </Badge>
          <Badge className="bg-[#fdeded] text-[#ed5e5e] hover:bg-[#fdeded]/80 rounded-full px-4 py-1">
            Test Drive
          </Badge>
          <Badge className="bg-[#ecf6fe] text-[#2196f3] hover:bg-[#ecf6fe]/80 rounded-full px-4 py-1">
            Consultation
          </Badge>
          <Badge className="bg-[#fff5eb] text-[#ffb056] hover:bg-[#fff5eb]/80 rounded-full px-4 py-1">
            Offers
          </Badge>
          <Badge className="bg-[#f0edfc] text-[#654ce6] hover:bg-[#f0edfc]/80 rounded-full px-4 py-1">
            Support
          </Badge>
          <Badge className="bg-[#e7f6ef] text-[#13c56b] hover:bg-[#e7f6ef]/80 rounded-full px-4 py-1">
            Support
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesOfferedSection;

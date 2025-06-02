import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import {
  Badge,
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';

const CardInformationSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-gray-400">
          Card Information
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-300 border-[#d5d7da]"
        >
          <span className="mr-1">+</span> Add Card
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mastercard */}
        <div className="flex items-center justify-between py-3 border-b border-[#eaebec]">
          <div className="flex items-center">
            <ChevronDown className="w-5 h-5 text-gray-300 mr-3" />
            <div className="w-10 h-6 bg-[#f7f7f9] rounded flex items-center justify-center mr-3">
              <Image
                src="/images/dashboard/profile/mastercard.png"
                alt="Mastercard"
                width={40}
                height={24}
                className="w-8 h-5 object-contain"
              />
            </div>
            <div>
              <p className="font-medium text-gray-400">Mastercard</p>
              <p className="text-sm text-[#747b87]">Expires Apr 2028</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="h-8 w-8 text-[#747b87]">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 text-[#747b87]">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* American Express - Expanded */}
        <div className="border-b border-[#eaebec]">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <ChevronUp className="w-5 h-5 text-gray-300 mr-3" />
              <div className="w-10 h-6 bg-[#f7f7f9] rounded flex items-center justify-center mr-3">
                <Image
                  src="/images/dashboard/profile/american-express.png"
                  alt="American Express"
                  width={40}
                  height={24}
                  className="w-8 h-5 object-contain"
                />
              </div>
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-gray-400">American Express</p>
                  <p className="text-sm text-[#747b87]">45 Baker Terrace</p>
                </div>
                <Badge className="ml-3 bg-[#e7f6ef] text-[#13c56b] hover:bg-[#e7f6ef]/80 rounded-full px-3 py-0.5 text-xs">
                  Primary
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#747b87]"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#747b87]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4 py-4 px-12 text-sm">
            <div>
              <p className="text-[#747b87]">Name</p>
              <p className="font-medium text-gray-400">Kawsar Amin</p>
            </div>
            <div>
              <p className="text-[#747b87]">Billing Phone Number</p>
              <p className="font-medium text-gray-400">+7634 983 637</p>
            </div>
            <div>
              <p className="text-[#747b87]">Number</p>
              <p className="font-medium text-gray-400">**** 4487</p>
            </div>
            <div>
              <p className="text-[#747b87]">Email</p>
              <p className="font-medium text-gray-400">vafgot@vultukir.org</p>
            </div>
            <div>
              <p className="text-[#747b87]">Expires</p>
              <p className="font-medium text-gray-400">08/2028</p>
            </div>
            <div>
              <p className="text-[#747b87]">Origin</p>
              <p className="font-medium text-gray-400">United States</p>
            </div>
            <div>
              <p className="text-[#747b87]">Type</p>
              <p className="font-medium text-gray-400">Mastercard Card</p>
            </div>
            <div>
              <p className="text-[#747b87]">CVC check</p>
              <div className="flex items-center">
                <p className="font-medium text-gray-400 mr-1">Passed</p>
                <Check className="h-4 w-4 text-[#13c56b]" />
              </div>
            </div>
            <div>
              <p className="text-[#747b87]">Issuer</p>
              <p className="font-medium text-gray-400">VICBANK</p>
            </div>
            <div>
              <p className="text-[#747b87]">ID</p>
              <p className="font-medium text-gray-400">DH73DJ8</p>
            </div>
          </div>
        </div>

        {/* Visa */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <ChevronDown className="w-5 h-5 text-gray-300 mr-3" />
            <div className="w-10 h-6 bg-[#f7f7f9] rounded flex items-center justify-center mr-3">
              <Image
                src="/images/dashboard/profile/visa.png"
                alt="Visa"
                width={40}
                height={24}
                className="w-8 h-5 object-contain"
              />
            </div>
            <div>
              <p className="font-medium text-gray-400">Visa</p>
              <p className="text-sm text-[#747b87]">512 Water Plant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#747b87]"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#747b87]"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInformationSection;

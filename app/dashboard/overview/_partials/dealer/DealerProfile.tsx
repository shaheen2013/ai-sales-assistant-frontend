'use client';
import ProfileHeader from '@/components/partials/dashboard/profile/profile-header';
import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { useGetDealerProfileQuery } from '@/features/dealer/dealerProfileSlice';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';

export default function DealerProfile() {
  const { data } = useGetDealerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dealerProfileData = data?.data;
  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm overflow-hidden flex flex-col gap-6 ">
      {/* Header Section */}
      <ProfileHeader />
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="md:col-span-2 space-y-6">
          {/* Short Bio Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-400">Short Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                {dealerProfileData?.about}
              </p>
            </CardContent>
          </Card>

          {/* Services Offered Section */}
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

          {/* Card Information Section */}
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
                        <p className="font-medium text-gray-400">
                          American Express
                        </p>
                        <p className="text-sm text-[#747b87]">
                          45 Baker Terrace
                        </p>
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
                    <p className="font-medium text-gray-400">
                      vafgot@vultukir.org
                    </p>
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
        </div>

        <div className="space-y-6">
          {/* Premium Section */}
          <Card>
            <CardContent className="pt-6 ">
              <div className="flex items-start">
                <div>
                  <Badge className="bg-[#e7f6ef] text-[#13c56b] hover:bg-[#e7f6ef]/80 rounded-full px-3 py-0.5 mb-2">
                    Enterprise
                  </Badge>

                  <h2 className="text-[20px] font-semibold text-gray-400 mt-2">
                    Premium
                  </h2>
                  <p className="text-gray-300 text-sm mt-2">
                    Perfect for brands who sale new cars
                  </p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-400 flex items-baseline">
                  <span className="text-gray-400 text-3xl">$10.00</span>
                  <span className=" text-gray-400 text-sm ml-1">/month</span>
                </h3>
              </div>
              <div className="mt-6 flex justify-between items-center gap-6">
                <Button variant="link" className="text-[#2196f3] p-0 h-auto">
                  Learn more
                </Button>

                <Button className="w-full  bg-white text-primary-600 border border-primary-100 hover:bg-gray-50">
                  Upgrade plan
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
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
                  <p className="text-gray-400 font-medium">
                    {dealerProfileData?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#13c56b]" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium">
                    {dealerProfileData?.street_address},{' '}
                    {dealerProfileData?.city}, {dealerProfileData?.state},{' '}
                    {dealerProfileData?.country}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
                  <Phone className="w-4 h-4 text-[#13c56b]" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium">
                    {dealerProfileData?.phone_number}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#e7f6ef] flex items-center justify-center mr-3 mt-0.5">
                  <LinkIcon className="w-4 h-4 text-[#13c56b]" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium">
                    {dealerProfileData?.website || 'wwww.demowebsite.com'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* invite your friends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-400">
                Invite Your Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-12 h-12 rounded-full bg-[#ecf6fe] flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#2196f3]" />
                </div>
                <h3 className="font-medium text-gray-400 mb-2">
                  Share with friends
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Invite your friends to join and get premium benefits
                </p>
                <div className="w-full">
                  <Button className="w-full bg-primary-600 text-white hover:bg-primary-700">
                    Send Invites
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Public Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-400">
                Public Embed Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[#f7f7f9] rounded p-3 text-xs text-gray-300 font-mono overflow-x-auto">
                {
                  '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/46300gwAGfGjrXTeitnpL/Ai-Sales-Assistant?node-id=57-116&embed-host=share" allowfullscreen></iframe>'
                }
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button variant="link" className="text-[#2196f3] p-0 h-auto">
                  Learn more
                </Button>
                <Button className="bg-white text-primary-600 border border-primary-100 hover:bg-gray-50">
                  Copy
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

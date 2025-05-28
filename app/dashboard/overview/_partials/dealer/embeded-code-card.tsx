"use client";

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { useGetDealerProfileQuery } from '@/features/dealer/dealerProfileSlice';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
const PublicEmbedCodeCard = () => {
  const { data } = useGetDealerProfileQuery(undefined);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const embeddedCode = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="1440" height="600" src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/dealers/${data?.data?.dealer_details?.id}" allowfullscreen></iframe>`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Public Embed Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-[#f7f7f9] rounded p-3 text-xs text-gray-300 font-mono overflow-x-auto">
          {
            embeddedCode
          }
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button variant="link" className="text-[#2196f3] p-0 h-auto">
            Learn more
          </Button>
          <Button className="bg-white text-primary-600 border border-primary-100 hover:bg-gray-50" onClick={() => handleCopy(embeddedCode)}>
            {isCopied ? 'Copied!' : 'Copy'}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicEmbedCodeCard;

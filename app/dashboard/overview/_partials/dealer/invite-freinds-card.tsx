import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { FacebookIcon } from 'lucide-react';

const InviteFreindsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">
          Invite Your Friends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-stretch w-full">
          <div className="flex-1">
            <Input placeholder="Enter email" />
          </div>
          <Button variant={'primary'}>Submit</Button>
        </div>
        <h5 className="text-base font-semibold text-gray-400 mt-4">
          Share The Referral Link
        </h5>
        <div className="flex gap-4 items-stretch w-full">
          <div className="flex-1">
            <Input placeholder="tezzai.com/?ref=6479" />
          </div>
          <FacebookIcon className="w-6 h-6 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteFreindsCard;

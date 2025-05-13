import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Mail } from 'lucide-react';

const InviteFreindsCard = () => {
  return (
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
          <h3 className="font-medium text-gray-400 mb-2">Share with friends</h3>
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
  );
};

export default InviteFreindsCard;

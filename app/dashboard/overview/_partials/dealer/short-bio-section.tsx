import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

const ShortBioSection = ({ bio }: { bio: string }) => {
  return (
    <div>
      {' '}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-400">Short Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">
            {bio || 'Bio is not set yet!'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortBioSection;

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { ArrowUpRight } from 'lucide-react';
const PublicEmbedCodeCard = () => {
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
  );
};

export default PublicEmbedCodeCard;

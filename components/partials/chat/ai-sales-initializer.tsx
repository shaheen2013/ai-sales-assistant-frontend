import Button from '@/components/button';
import { Input } from '@/components/shadcn/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { TeezAILogoImageSVG } from './svg-icons';

interface AISalesInitializerProps {
  emailValue: string;
  selectedDealer: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDealerChange: (value: string) => void;
  onEmailSubmit: () => void;
}

export default function AISalesInitializer({
  emailValue,
  selectedDealer,
  onEmailChange,
  onEmailSubmit,
  onDealerChange,
}: AISalesInitializerProps) {
  console.log('selected dealer', selectedDealer);
  return (
    <div className="flex flex-col items-center lg:mt-32">
      <TeezAILogoImageSVG />

      <h4 className="text-[#6B7280] text-center text-[16px] font-normal max-w-3xl lg:mb-12 mb-2 px-6">
        Teezai is where ambition meets expression. Born from the spirit of
        fearless creativity, we empower the next generation to wear their
        vision. Every design, every drop, every detail — it&apos;s all about
        standing out, owning your voice, and pushing boundaries.
      </h4>

      <div className="w-full max-w-3xl grid lg:grid-cols-2 grid-cols-1 gap-5 mb-6 px-6">
        {/* select your dealer */}
        <div>
          <label htmlFor="" className="text-gray-700 font-semibold mb-2 block">
            Select your Dealer: <span className="text-red-500">*</span>
          </label>

          <Select onValueChange={onDealerChange}>
            <SelectTrigger className="h-11 border-[#D5D7DA]">
              <SelectValue placeholder="Select a Dealer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="continental-motors">
                  Continental Motors
                </SelectItem>
                <SelectItem value="skyline-autohaus">
                  Skyline Autohaus
                </SelectItem>
                <SelectItem value="ironclad-motors">Ironclad Motors</SelectItem>
                <SelectItem value="velocity-garage">Velocity Garage</SelectItem>
                <SelectItem value="crimson-ridge-motors">
                  Crimson Ridge Motors
                </SelectItem>
                <SelectItem value="silverline-dealers">
                  Silverline Dealers
                </SelectItem>
                <SelectItem value="northstar-auto-group">
                  NorthStar Auto Group
                </SelectItem>
                <SelectItem value="urbancruise-motors">
                  UrbanCruise Motors
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* enter your email */}
        <div>
          <label htmlFor="" className="text-gray-700 font-semibold mb-2 block">
            Enter your email: <span className="text-red-500">*</span>
          </label>

          <Input
            type="email"
            required={true}
            placeholder="Enter your email"
            className="h-11"
            value={emailValue}
            onChange={onEmailChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEmailSubmit();
              }
            }}
          />
        </div>
      </div>

      <div>
        <Button
          variant="primary"
          className="px-12 h-11 rounded-lg"
          onClick={onEmailSubmit}
        >
          Start Chat
        </Button>
      </div>
    </div>
  );
}

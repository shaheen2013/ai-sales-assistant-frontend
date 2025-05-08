import { Button } from '@/components/shadcn/button';
import { Checkbox } from '@/components/shadcn/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/radio-group';
import { Separator } from '@/components/shadcn/separator';
import Link from 'next/link';

export default function NotificationSection() {
  return (
    <div className=" mx-auto p-6 bg-white rounded-2xl border border-gray-50">
      <h1 className="text-[#2b3545] text-2xl font-semibold mb-6">
        Notifications
      </h1>

      {/* Email Notifications Section */}
      <div className="mb-8">
        <h2 className="text-[#2b3545] text-lg font-medium mb-2">
          Email Notifications
        </h2>
        <p className="text-[#555d6a] mb-6">
          When you&apos;re busy or not online, Substance can send you email
          notifications for any new direct messages or mentions of your name.
        </p>

        <div className="mb-4">
          <h3 className="text-[#2b3545] font-medium mb-4">
            Send me email notifications:
          </h3>
          <RadioGroup defaultValue="never" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="always"
                id="always"
                className="border-[#d5d7da] text-[#019935]"
              />
              <label htmlFor="always" className="text-[#555d6a]">
                Send me email notification
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="hourly"
                id="hourly"
                className="border-[#d5d7da] text-[#019935]"
              />
              <label htmlFor="hourly" className="text-[#555d6a]">
                Once an hour at most
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="never"
                id="never"
                className="border-[#d5d7da] text-[#019935]"
              />
              <label htmlFor="never" className="text-[#555d6a]">
                Never
              </label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Email News & Updates Section */}
      <div className="mb-8">
        <h2 className="text-[#2b3545] text-lg font-medium mb-2">
          Email News & Updates
        </h2>
        <p className="text-[#555d6a] mb-6">
          From time to time, we&apos;d like to send you emails with interesting
          news about Cuboid and your workspace. You can choose which of these
          updates you&apos;d like to receive:
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tips"
              defaultChecked
              className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
            />
            <label htmlFor="tips" className="text-[#555d6a]">
              Tips and Tricks
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="offers"
              defaultChecked
              className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
            />
            <label htmlFor="offers" className="text-[#555d6a]">
              Offers and Promotions
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="research"
              defaultChecked
              className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
            />
            <label htmlFor="research" className="text-[#555d6a]">
              Research Opportunies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              defaultChecked
              className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
            />
            <label htmlFor="newsletter" className="text-[#555d6a]">
              Cuboid Developer Newsletter: Best practices for connecting your
              work to Substance via our platform
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="changelog"
              defaultChecked
              className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
            />
            <label htmlFor="changelog" className="text-[#555d6a]">
              Cuboid Platform Changelog: Stay in the know when we make updates
              to our APIs
            </label>
          </div>
        </div>
      </div>

      {/* Sign-in Notifications Section */}
      <div className="mb-8">
        <h2 className="text-[#2b3545] text-lg font-medium mb-2">
          Sign-in Notifications
        </h2>
        <p className="text-[#555d6a] mb-6">
          These emails help keep your Substance account secure. If you
          haven&apos;t already, you should also enable two-factor
          authentication.
        </p>

        <RadioGroup defaultValue="none" className="space-y-4">
          <div className="flex items-start space-x-2">
            <RadioGroupItem
              value="most-secure"
              id="most-secure"
              className="border-[#d5d7da] text-[#019935] mt-1"
            />
            <div>
              <label
                htmlFor="most-secure"
                className="text-[#555d6a] font-medium"
              >
                Most secure
              </label>
              <p className="text-[#717882] text-sm mt-1">
                Receive an email anytime someone signs in to your Cuboid account
                from an unrecognized device.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem
              value="standard"
              id="standard"
              className="border-[#d5d7da] text-[#019935] mt-1"
            />
            <div>
              <label htmlFor="standard" className="text-[#555d6a] font-medium">
                Standard
              </label>
              <p className="text-[#717882] text-sm mt-1">
                Receive an email when someone signs in from a new location, with
                an unrecognized device.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem
              value="none"
              id="none"
              className="border-[#d5d7da] text-[#019935] mt-1"
            />
            <div>
              <label htmlFor="none" className="text-[#555d6a] font-medium">
                Don&apos;t send me any sign-in notifications
              </label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <p className="text-[#555d6a] text-sm mb-6">
        If you opt out of the above, note that we&apos;ll still send you
        important administrative emails, such as password resets.
      </p>

      <div className="mb-8">
        <p className="text-[#555d6a]">
          We will use this email address:{' '}
          <span className="text-[#2b3545] font-medium">hello@carhouse.com</span>{' '}
          <Link href="#" className="text-[#019935]">
            (change address)
          </Link>
          .
        </p>
      </div>

      <Separator className="my-6 bg-[#eaebec]" />

      <div className="flex justify-start gap-4">
        <Button variant="outline" className="border-[#d5d7da] text-[#555d6a]">
          Discard
        </Button>
        <Button className="bg-[#019935] hover:bg-[#019935]/90 text-white">
          Save changes
        </Button>
      </div>
    </div>
  );
}

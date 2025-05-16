'use client';

import { Button } from '@/components/shadcn/button';
import { Checkbox } from '@/components/shadcn/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/radio-group';
import { Separator } from '@/components/shadcn/separator';
import { useUpdateNotificationSettingsMutation } from '@/features/dealer/dealerProfileSlice';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define the notification settings schema
const notificationSchema = z.object({
  notification_method: z.enum([
    'send_email_notification',
    'once_an_hour_at_most',
    'never',
  ]),
  is_send_tips_and_tricks: z.boolean(),
  is_send_offers_and_promotions: z.boolean(),
  is_send_research_opportunities: z.boolean(),
  is_send_developer_newsletters: z.boolean(),
  is_send_platform_changelogs: z.boolean(),
  sign_in_notification_method: z.enum(['most_secure', 'standard', 'dont_send']),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function NotificationSection() {
  const toast = useToast();
  const [updateNotificationSettings, { isLoading }] =
    useUpdateNotificationSettingsMutation();

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notification_method: 'never',
      is_send_tips_and_tricks: true,
      is_send_offers_and_promotions: true,
      is_send_research_opportunities: true,
      is_send_developer_newsletters: true,
      is_send_platform_changelogs: true,
      sign_in_notification_method: 'standard',
    },
  });

  // Fetch and set initial values (you would implement this if you have a query)
  // useEffect(() => {
  //   if (notificationData) {
  //     form.reset(notificationData);
  //   }
  // }, [notificationData, form]);

  const onSubmit = async (values: NotificationFormValues) => {
    try {
      const response = await updateNotificationSettings(values).unwrap();
      console.log(response, 'response');
      toast('success', 'Notification settings updated successfully');
    } catch (error: any) {
      toast(
        'error',
        error.data.detail || 'Failed to update notification settings'
      );
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-2xl border border-gray-50">
      <h1 className="text-[#2b3545] text-2xl font-semibold mb-6">
        Notifications
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Email Notifications Section */}
          <div className="mb-8">
            <h2 className="text-[#2b3545] text-lg font-medium mb-2">
              Email Notifications
            </h2>
            <p className="text-[#555d6a] mb-6">
              When you&apos;re busy or not online, Substance can send you email
              notifications for any new direct messages or mentions of your
              name.
            </p>

            <div className="mb-4">
              <h3 className="text-[#2b3545] font-medium mb-4">
                Send me email notifications:
              </h3>
              <FormField
                control={form.control}
                name="notification_method"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="send_email_notification"
                            id="send_email_notification"
                            className="border-[#d5d7da] text-[#019935]"
                          />
                          <label
                            htmlFor="send_email_notification"
                            className="text-[#555d6a]"
                          >
                            Send me email notification
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="once_an_hour_at_most"
                            id="once_an_hour_at_most"
                            className="border-[#d5d7da] text-[#019935]"
                          />
                          <label
                            htmlFor="once_an_hour_at_most"
                            className="text-[#555d6a]"
                          >
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email News & Updates Section */}
          <div className="mb-8">
            <h2 className="text-[#2b3545] text-lg font-medium mb-2">
              Email News & Updates
            </h2>
            <p className="text-[#555d6a] mb-6">
              From time to time, we&apos;d like to send you emails with
              interesting news about Cuboid and your workspace. You can choose
              which of these updates you&apos;d like to receive:
            </p>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="is_send_tips_and_tricks"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="tips"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
                      />
                    </FormControl>
                    <label htmlFor="tips" className="text-[#555d6a]">
                      Tips and Tricks
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_send_offers_and_promotions"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="offers"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
                      />
                    </FormControl>
                    <label htmlFor="offers" className="text-[#555d6a]">
                      Offers and Promotions
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_send_research_opportunities"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="research"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
                      />
                    </FormControl>
                    <label htmlFor="research" className="text-[#555d6a]">
                      Research Opportunities
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_send_developer_newsletters"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="newsletter"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
                      />
                    </FormControl>
                    <label htmlFor="newsletter" className="text-[#555d6a]">
                      Cuboid Developer Newsletter: Best practices for connecting
                      your work to Substance via our platform
                    </label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_send_platform_changelogs"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="changelog"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#d5d7da] text-white data-[state=checked]:bg-[#019935] data-[state=checked]:border-[#019935]"
                      />
                    </FormControl>
                    <label htmlFor="changelog" className="text-[#555d6a]">
                      Cuboid Platform Changelog: Stay in the know when we make
                      updates to our APIs
                    </label>
                  </FormItem>
                )}
              />
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

            <FormField
              control={form.control}
              name="sign_in_notification_method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem
                          value="most_secure"
                          id="most_secure"
                          className="border-[#d5d7da] text-[#019935] mt-1"
                        />
                        <div>
                          <label
                            htmlFor="most_secure"
                            className="text-[#555d6a] font-medium"
                          >
                            Most secure
                          </label>
                          <p className="text-[#717882] text-sm mt-1">
                            Receive an email anytime someone signs in to your
                            Cuboid account from an unrecognized device.
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
                          <label
                            htmlFor="standard"
                            className="text-[#555d6a] font-medium"
                          >
                            Standard
                          </label>
                          <p className="text-[#717882] text-sm mt-1">
                            Receive an email when someone signs in from a new
                            location, with an unrecognized device.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem
                          value="dont_send"
                          id="dont_send"
                          className="border-[#d5d7da] text-[#019935] mt-1"
                        />
                        <div>
                          <label
                            htmlFor="dont_send"
                            className="text-[#555d6a] font-medium"
                          >
                            Don&apos;t send me any sign-in notifications
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-[#555d6a] text-sm mb-6">
            If you opt out of the above, note that we&apos;ll still send you
            important administrative emails, such as password resets.
          </p>

          <div className="mb-8">
            <p className="text-[#555d6a]">
              We will use this email address:{' '}
              <span className="text-[#2b3545] font-medium">
                hello@carhouse.com
              </span>{' '}
              <Link href="#" className="text-[#019935]">
                (change address)
              </Link>
              .
            </p>
          </div>

          <Separator className="my-6 bg-[#eaebec]" />

          <div className="flex justify-start gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#d5d7da] text-[#555d6a]"
              onClick={() => form.reset()}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="bg-[#019935] hover:bg-[#019935]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

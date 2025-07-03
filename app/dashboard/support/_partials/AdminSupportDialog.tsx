"use client";

import moment from "moment";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/shadcn/dialog";

import {
  useDeleteAdminSupportTicketMutation,
  useUpdateAdminSupportTicketMutation,
} from "@/features/admin/adminSupportSlice";

import Button from "@/components/button";
import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { Textarea } from "@/components/shadcn/textarea";
import SimpleSelect from "@/components/select/SimpleSelect";
import { Input, InputCopy } from "@/components/shadcn/input";
import { SupportTicketType } from "@/types/supportTicketType";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

const AdminSupportDialog = ({ data, onOpenChange, open, setData }: any) => {
  /*--Hook Forms--*/
  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: data?.status,
    },
  });

  /*--Custom Hooks--*/
  const toast = useToast();

  /*--RTK Query--*/
  const [updateSupportTicket, { isLoading: updateSupportTicketLoading }] =
    useUpdateAdminSupportTicketMutation();

  const [deleteSupportTicket, { isLoading: deleteTicketLoading }] =
    useDeleteAdminSupportTicketMutation();

  /*--Functions--*/
  // const handleDeleteTicket = async (id: string) => {
  //   try {
  //     await deleteSupportTicket(id);
  //     toast("success", "Ticket deleted successfully!");
  //     onOpenChange(false);
  //   } catch (err) {
  //     toast("error", beautifyErrors(err));
  //   }
  // };

  const onSubmit = async (formData: any) => {
    try {
      const response = await updateSupportTicket({
        ticketId: data?.ticket_id,
        data: formData,
      }).unwrap();
      if (response) {
        toast("success", "Ticket updated successfully!");
        onOpenChange(false);
      }
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-4">
        <DialogHeader className="text-[#717882] text-xl font-semibold flex items-center flex-row justify-between border-b border-[#eff4fa] pb-4 mb-4">
          <DialogTitle>Dealer Support Details</DialogTitle>
        </DialogHeader>

        <div className="overflow-auto h-full ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              {/* Top Info: Dealer ID and Ticket ID */}
              <div className="col-span-12 grid grid-cols-12 gap-4 border-b border-[#eff4fa] pb-4">
                <InputCopy
                  type="input"
                  id="dealerId"
                  label="Dealer ID"
                  value={data?.dealer?.id}
                  copyText={String(data?.dealer?.id)}
                  disabled
                  wrapperClassName="col-span-12 md:col-span-6"
                />
                <InputCopy
                  type="problemId"
                  id="problemId"
                  label="Support Ticket Id"
                  value={data?.ticket_id}
                  disabled
                  wrapperClassName="col-span-12 md:col-span-6"
                  copyText={data?.ticket_id}
                />
              </div>

              {/* Dealer Name */}
              <Input
                placeholder="e.g. John Doe"
                label="Dealer Name"
                className="rounded-lg h-11"
                wrapperClassName="col-span-12"
                disabled
                value={data?.dealer?.name}
              />

              {/* Email */}
              <Input
                className="rounded-lg h-11"
                placeholder="dealer@teez.com"
                label="Email"
                wrapperClassName="col-span-12 md:col-span-6"
                disabled
                value={data?.dealer?.email}
              />

              {/* Phone */}
              <Input
                className="rounded-lg h-11 disabled:!text-[#A4A7AE]"
                label="Phone"
                wrapperClassName="col-span-12 md:col-span-6"
                disabled
                value={data?.dealer?.phone || "N/A"}
              />

              {/* Created Date */}
              <Input
                className="rounded-lg h-11"
                placeholder="Today 22 Oct, 2025"
                label="Created Date"
                wrapperClassName="col-span-12 sm:col-span-6"
                disabled
                value={moment(data?.created_at).format("DD MMM, YYYY")}
              />

              {/* Created Time */}
              <Input
                className="rounded-lg h-11"
                placeholder="06:00 AM"
                label="Created Time"
                wrapperClassName="col-span-12 sm:col-span-6"
                disabled
                value={moment(data?.created_at).format("hh:mm A")}
              />

              {/* Problem Summary */}
              <Textarea
                label="Problem Summary"
                placeholder="Problem description"
                className="min-h-[98px]"
                wrapperClassName="col-span-12"
                value={data?.description}
                helperText="This is the problem description provided by the dealer."
                disabled
              />

              {/* Status Select */}
              <div className="col-span-12">
                <Controller
                  name="status"
                  control={control}
                  // defaultValue={data?.status}
                  render={({ field }) => (
                    // <SimpleSelect
                    //             {...field}
                    //             options={[
                    //               {
                    //                 label: "Open",
                    //                 value: "open",
                    //               },
                    //               {
                    //                 label: "Close",
                    //                 value: "closed",
                    //               },
                    //               {
                    //                 label: "In Progress",
                    //                 value: "in_progress",
                    //               },
                    //               {
                    //                 label: "Resolved",
                    //                 value: "resolved",
                    //               },
                    //             ]}
                    //             label="Status"
                    //             wrapperClassName="xl:col-span-2"
                    //             triggerClassName="max-w-full"
                    //             placeholder="Select Status"
                    //           />
                    //         )}
                    //       />

                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      // defaultValue={data?.status}
                      disabled={updateSupportTicketLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Button Row */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
              <Button
                variant="red"
                className="text-sm !font-medium min-w-[85px] w-full sm:w-auto"
                loading={deleteTicketLoading}
                disabled={deleteTicketLoading}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  setData(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="text-sm !font-medium min-w-[187px] w-full sm:w-auto"
                loading={updateSupportTicketLoading}
                disabled={updateSupportTicketLoading}
              >
                Update Information
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSupportDialog;

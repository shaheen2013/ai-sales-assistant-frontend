"use client";

import Button from '@/components/button';
import SimpleSelect from '@/components/select/SimpleSelect';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { Input, InputCopy } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea';
import { useDeleteAdminSupportTicketMutation, useUpdateAdminSupportTicketMutation } from '@/features/admin/adminSupportSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors } from '@/lib/utils';
import { SupportTicketType } from '@/types/supportTicketType';
import moment from 'moment';
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form';

type AdminSupportDialogPropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SupportTicketType | null;
}

type FormDataType = {
  status: string;
}

const AdminSupportDialog: FC<AdminSupportDialogPropsType> = ({ data, onOpenChange, open }) => {
  /*--Hook Forms--*/
  const { control, handleSubmit } = useForm<FormDataType>({
    defaultValues: {
      status: data?.status
    }
  })

  /*--Custom Hooks--*/
  const toast = useToast();

  /*--RTK Query--*/
  const [updateSupportTicket, { isLoading: updateSupportTicketLoading }] = useUpdateAdminSupportTicketMutation();
  const [deleteSupportTicket, { isLoading: deleteTicketLoading }] = useDeleteAdminSupportTicketMutation();

  /*--Functions--*/
  const handleDeleteTicket = async (id: string) => {
    try {
      await deleteSupportTicket(id);
      toast("success", "Ticket deleted successfully!");
      onOpenChange(false);
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  };

  const onSubmit = async (formData: FormDataType) => {
    try {
      const response = await updateSupportTicket({ ticketId: data?.ticket_id, data: formData }).unwrap();
      if (response) {
        toast("success", "Ticket updated successfully!");
        onOpenChange(false);
      }
    } catch (err) {
      toast("error", beautifyErrors(err));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-4'>
        <DialogHeader className='text-[#717882] text-xl font-semibold flex items-center flex-row justify-between border-b border-[#eff4fa] pb-4 mb-4'>
          <DialogTitle>Dealer Support Details</DialogTitle>
        </DialogHeader>

        <div className='overflow-auto h-full '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
              <div className='xl:col-span-2 grid grid-cols-12 gap-4 border-b border-[#eff4fa] pb-4'>
                <InputCopy
                  type="input"
                  id="dealerId"
                  label='Dealer ID'
                  value={data?.dealer?.id}
                  copyText={String(data?.dealer?.id)}
                  disabled
                  wrapperClassName='col-span-12 xl:col-span-6'
                />
                <InputCopy
                  type="problemId"
                  id="problemId"
                  label='Problem ID'
                  value={data?.ticket_id}
                  disabled
                  wrapperClassName='col-span-12 xl:col-span-6'
                  copyText={data?.ticket_id}
                />
              </div>

              <Input
                placeholder={"e.g. John Doe"}
                label='Dealer Name'
                className='rounded-lg h-11'
                wrapperClassName='xl:col-span-2'
                disabled
                value={data?.dealer?.name}
              />

              <Input
                className='rounded-lg h-11'
                placeholder='dealer@teez.com'
                label='Email'
                disabled
                value={data?.dealer?.email}
              />

              <Input
                className='rounded-lg h-11'
                placeholder='+001 654 265'
                label='Phone'
                disabled
                value={data?.dealer?.phone}
              />
              <Input
                className='rounded-lg h-11'
                placeholder='Today 22 Otc, 2025'
                label='Created Date'
                disabled
                value={moment(data?.created_at)?.format("DD MMM, YYYY")}
              />
              <Input
                className='rounded-lg h-11'
                placeholder='06 : 00 AM'
                label='Created Time'
                disabled
                value={moment(data?.created_at)?.format("hh:mm A")}
              />
              <Textarea
                label='Problem Summary'
                placeholder="Problem description"
                className="min-h-[98px]"
                wrapperClassName="xl:col-span-2 pb-4 border-b border-[#eff4fa]"
                message='This is a hint text to help user.'
                value={data?.description}
              />

              <Controller
                name='status'
                control={control}
                defaultValue={data?.status}
                render={({ field }) => (
                  <SimpleSelect
                    {...field}
                    options={[
                      {
                        label: "Open",
                        value: "open"
                      },
                      {
                        label: "Close",
                        value: "closed"
                      },
                      {
                        label: "In Progress",
                        value: "in_progress"
                      },
                      {
                        label: "Resolved",
                        value: "resolved"
                      }
                    ]}
                    label='Status'
                    wrapperClassName='xl:col-span-2'
                    triggerClassName='max-w-full'
                    placeholder='Select Status'
                  />
                )}
              />
            </div>

            <div className='flex items-center justify-end gap-4 mt-[50px] '>
              <Button
                variant='red'
                className='text-sm !font-medium max-w-fit [&>svg]:m-0 min-w-[85px]'
                loading={deleteTicketLoading}
                disabled={deleteTicketLoading}
                type="button"
                onClick={() => handleDeleteTicket(data?.ticket_id || "")}
              >
                Delete
              </Button>
              <Button
                variant='primary'
                className='text-sm !font-medium max-w-fit [&>svg]:m-0 min-w-[187px]'
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
  )
}

export default AdminSupportDialog
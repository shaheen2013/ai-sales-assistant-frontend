"use client";

import Button from '@/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea';
import { useCreateSupportTicketMutation, useUpdateDealerSupportTicketMutation } from '@/features/dealer/dealerSlice';
import { useToast } from '@/hooks/useToast';
import { beautifyErrors } from '@/lib/utils';
import { SupportTicketType } from '@/types/supportTicketType';
import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';

type AskSupportCreateDialogPropsType = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: SupportTicketType | null;
}

type FormDataType = {
    subject: string;
    description: string;
}

const AskSupportCreateDialog: FC<AskSupportCreateDialogPropsType> = ({ data, onOpenChange, open }) => {
    /*--Hook Forms--*/
    const { control, handleSubmit, reset } = useForm<FormDataType>({
        defaultValues: {
            subject: data?.subject,
            description: data?.description
        }
    })

    /*--Custom Hooks--*/
    const toast = useToast();

    /*--RTK Query--*/
    const [createSupportTicket, { isLoading: createSupportTicketLoading }] = useCreateSupportTicketMutation();
    const [updateSupportTicket, { isLoading: updateSupportTicketLoading }] = useUpdateDealerSupportTicketMutation();

    /*--Functions--*/
    const onSubmit = async (formData: FormDataType) => {
        try {
            const request = !!data ? updateSupportTicket({ ticketId: data?.ticket_id, data: formData }) : createSupportTicket(formData);
            const response = await request.unwrap();
            if (response) {
                toast("success", !!data ? "Ticket updated successfully!" : "Ticket created successfully!");
                onOpenChange(false);
                reset({
                    subject: "",
                    description: ""
                })
            }
        } catch (err) {
            toast("error", beautifyErrors(err));
        }
    }

    /*--UseEffect--*/
    useEffect(() => {
        if (data) {
            reset({
                subject: data.subject,
                description: data.description
            })
        }
    }, [data, reset])

    return (
        <Dialog open={open} onOpenChange={(open) => {
            onOpenChange(open);
            reset({
                subject: "",
                description: ""
            })
        }}>
            <DialogContent className='max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-4'>
                <DialogHeader className='text-[#717882] text-xl font-semibold flex items-center flex-row justify-between border-b border-[#eff4fa] pb-4 mb-4'>
                    <DialogTitle>{!!data ? "Update Support Ticket" : "Ask for new support"}</DialogTitle>
                </DialogHeader>

                <div className='overflow-auto h-full '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-1 gap-4'>

                            <Controller
                                control={control}
                                name='subject'
                                rules={{
                                    required: "Subject is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input
                                        {...field}
                                        error={error?.message}
                                        placeholder={"e.g. John Doe"}
                                        label='Subject *'
                                        className='rounded-lg h-11'
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name='description'
                                rules={{
                                    required: "Problem summary is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Textarea
                                        {...field}
                                        error={error?.message}
                                        label='Problem Summary *'
                                        placeholder="Problem description"
                                        className="min-h-[98px]"
                                    />
                                )}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-4 mt-[50px] '>
                            <Button
                                variant='outline-gray'
                                className='text-sm !font-medium max-w-fit [&>svg]:m-0 min-w-[85px]'
                                type="button"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='primary'
                                className='text-sm !font-medium max-w-fit [&>svg]:m-0 min-w-[160px]'
                                loading={createSupportTicketLoading || updateSupportTicketLoading}
                                disabled={createSupportTicketLoading || updateSupportTicketLoading}
                            >
                                {!!data ? "Update Ticket" : "Ask for support"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AskSupportCreateDialog
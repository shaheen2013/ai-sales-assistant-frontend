import { useGetBillingHistoryQuery } from "@/features/dealer/dealerProfileSlice";
import { Check, Download, X } from "lucide-react";

const BillingHistoryTable = () => {
  const { data: billingHistory } = useGetBillingHistoryQuery();
  const invoicesData = billingHistory?.results || [];

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-medium text-[#2b3545] mb-1">
            Billing history
          </h2>
          <p className="text-[#707070]">
            Manage your team members and their account permissions here.
          </p>
        </div>
        {/* TODO: Add a download all billing history functionality */}
        {/* <button className="mt-4 md:mt-0 flex items-center gap-2 text-[#2b3545] border border-[#eaebec] rounded-lg px-4 py-2">
          Download All Billing History <Download size={16} />
        </button> */}
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eaebec]">
              <th className="py-4 px-4 text-left font-medium text-[#707070]">
                Invoice
              </th>
              <th className="py-4 px-4 text-left font-medium text-[#707070]">
                Amount
              </th>
              <th className="py-4 px-4 text-left font-medium text-[#707070]">
                Date
              </th>
              <th className="py-4 px-4 text-left font-medium text-[#707070]">
                Status
              </th>
              <th className="py-4 px-4 text-center font-medium text-[#707070]">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {invoicesData?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 text-center py-20">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoicesData?.map((invoice: any) => (
                <tr key={invoice.id} className="border-b border-[#eaebec]">
                  <td className="py-4 px-4 text-[#2b3545]">
                    {invoice.plan_name}
                  </td>
                  <td className="py-4 px-4 text-[#2b3545]">{invoice.total}</td>
                  <td className="py-4 px-4 text-[#2b3545]">
                    {new Date(invoice.created)?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    {invoice.paid ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#b0dfc0] text-[#018b30] text-xs">
                        <Check size={12} /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#f0b4b4] text-[#990000] text-xs">
                        <X size={12} /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4  flex justify-center">
                    <a href={invoice.invoice_pdf} rel="noopener noreferrer ">
                      <Download size={18} className="text-center" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="mt-4 text-right">
        <Link href="#" className="text-[#019935] font-medium">
          View all
        </Link>
      </div> */}
    </div>
  );
};

export default BillingHistoryTable;

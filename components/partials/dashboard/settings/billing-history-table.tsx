import { Check, Download } from 'lucide-react';
import Link from 'next/link';

const BillingHistoryTable = () => {
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
        <button className="mt-4 md:mt-0 flex items-center gap-2 text-[#2b3545] border border-[#eaebec] rounded-lg px-4 py-2">
          Download All Billing History <Download size={16} />
        </button>
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
              <th className="py-4 px-4 text-left font-medium text-[#707070]">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                plan: 'Basic Plan – Dec 2025',
                amount: 'USD $10.00',
                date: 'Dec 1, 2025',
              },
              {
                id: 2,
                plan: 'Basic Plan – Nov 2025',
                amount: 'USD $10.00',
                date: 'Nov 1, 2025',
              },
              {
                id: 3,
                plan: 'Basic Plan – Oct 2025',
                amount: 'USD $10.00',
                date: 'Oct 1, 2025',
              },
              {
                id: 4,
                plan: 'Basic Plan – Sep 2025',
                amount: 'USD $10.00',
                date: 'Sep 1, 2025',
              },
            ].map((invoice) => (
              <tr key={invoice.id} className="border-b border-[#eaebec]">
                <td className="py-4 px-4 text-[#2b3545]">{invoice.plan}</td>
                <td className="py-4 px-4 text-[#2b3545]">{invoice.amount}</td>
                <td className="py-4 px-4 text-[#2b3545]">{invoice.date}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#b0dfc0] text-[#018b30] text-xs">
                    <Check size={12} /> Paid
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#707070]">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <Link href="#" className="text-[#019935] font-medium">
          View all
        </Link>
      </div>
    </div>
  );
};

export default BillingHistoryTable;

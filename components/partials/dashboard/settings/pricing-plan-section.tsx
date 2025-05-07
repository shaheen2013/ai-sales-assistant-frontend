import { ArrowUpRight, Check, Download } from 'lucide-react';
import Link from 'next/link';

export default function PricingPlanSection() {
  return (
    <div className="rounded-2xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-[#2b3545] mb-2">
          Pricing Plans
        </h1>
        <p className="text-[#707070]">
          We belive that all should be accecible to all customers, no matter the
          size.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-[48px] border border-[#019935] p-1">
          <button className="rounded-[48px] px-6 py-2 text-[#707070]">
            Monthly billing
          </button>
          <button className="rounded-[48px] px-6 py-2 bg-[#019935] text-white">
            Annual billing
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-6">
        {/* Basic Plan */}
        <div className="border border-primary-100 rounded-xl p-6 flex flex-col  md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-medium text-[#2b3545]">
                  Basic plan
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#b0dfc0] text-[#018b30]">
                  Annual
                </span>
              </div>
              <p className="text-[#707070] mb-4">Perfect for sell used cars</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex items-start">
                <span className="text-[#019935] text-2xl font-medium">$</span>
                <span className="text-[#019935] text-5xl font-bold">10</span>
                <div className="flex flex-col ml-1 mt-2">
                  <span className="text-[#707070]">per month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <hr className="border-t border-[#eaebec] my-4" />
            <div className="flex justify-between">
              <Link href="#" className="text-[#019935] font-medium">
                Learn more
              </Link>
              <p className="text-[#019935] mt-2">This is the current plan</p>
            </div>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-[#eaebec] rounded-xl p-6 flex flex-col  md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-medium text-[#2b3545]">
                  Enterprise
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#b0dfc0] text-[#018b30]">
                  Annual
                </span>
              </div>
              <p className="text-[#707070] mb-4">
                Perfect for brands who sale new cars
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex items-start">
                <span className="text-[#2b3545] text-2xl font-medium">$</span>
                <span className="text-[#2b3545] text-5xl font-bold">20</span>
                <div className="flex flex-col ml-1 mt-2">
                  <span className="text-[#707070]">per month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <hr className="border-t border-[#eaebec] my-4" />
            <div className="flex justify-between">
              <Link href="#" className="text-[#019935] font-medium">
                Learn more
              </Link>
              <button className="flex items-center gap-1 text-[#019935] border border-[#019935] rounded-lg px-4 py-2">
                Upgrade plan <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Executive Assistant Plan */}
        <div className="border border-[#eaebec] rounded-xl p-6 flex flex-col md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-medium text-[#2b3545]">
                  Executive Assistant
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#b0dfc0] text-[#018b30]">
                  Annual
                </span>
              </div>
              <p className="text-[#707070] mb-4">
                Perfect for Team with multiple member
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex items-start">
                <span className="text-[#2b3545] text-2xl font-medium">$</span>
                <span className="text-[#2b3545] text-5xl font-bold">40</span>
                <div className="flex flex-col ml-1 mt-2">
                  <span className="text-[#707070]">per month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <hr className="border-t border-[#eaebec] my-4" />
            <div className="flex justify-between">
              <Link href="#" className="text-[#019935] font-medium">
                Learn more
              </Link>
              <button className="flex items-center gap-1 text-[#019935] border border-[#019935] rounded-lg px-4 py-2">
                Upgrade plan <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
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
    </div>
  );
}

import React from 'react'

// type Props = {}

const DealerStatistics = () => {
    return (
        <div>
            {/* conversions */}
            <div className="border p-4 rounded-xl mb-5 ">
                <h3 className="mb-2 text-[#535862] font-medium text-sm ">
                    Total Dealers
                </h3>

                <div className="flex items-center mb-5 gap-4">
                    <span className="text-gray-400 font-semibold text-3xl">10</span>

                    {/* badge  */}
                    <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                                stroke="#079455"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="text-[#414651] text-sm font-medium">12%</span>
                    </span>
                </div>

                <h3 className="mb-2 text-[#535862] font-medium text-sm ">
                    Paid Dealers
                </h3>

                <div className="flex items-center mb-5 gap-4">
                    <span className="text-gray-400 font-semibold text-3xl">13</span>

                    {/* badge  */}
                    <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                                stroke="#079455"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="text-[#414651] text-sm font-medium">13%</span>
                    </span>
                </div>

                <h3 className="mb-2 text-[#535862] font-medium text-sm ">
                    Paid Conversion Rate
                </h3>

                <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-semibold text-3xl">4,862</span>

                    {/* badge  */}
                    <span className="flex border items-center rounded-lg shadow px-2 py-1 gap-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5"
                                stroke="#079455"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="text-[#414651] text-sm font-medium">9.2%</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DealerStatistics
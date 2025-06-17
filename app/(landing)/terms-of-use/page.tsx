import ProSeller from '@/components/pro-seller/ProSeller'
import { cn } from '@/lib/utils'
import { termsOfUsConstData } from '@/static/termsOfUseConstData'
import React from 'react'


const page = () => {
    return (
        <div>
            <div className='bg-primary-500 px-4 py-9 xl:px-24 xl:py-14'>
                <div className="text-center text-white text-2xl xl:text-5xl font-bold">It&apos;s Easy with Us</div>
                <div className="text-center text-white text-sm font-normal xl:text-lg xl:font-medium mt-4 max-w-[1248px] mx-auto">Welcome to Teez, your AI-powered sales assistant for car dealerships and buyers. By using our platform, services, and website, you agree to the following terms and conditions.</div>
            </div>
            <div className='px-4 py-9 xl:px-24 xl:pt-12 xl:pb-[86px]'>
                <div className="text-center text-gray-900 text-2xl xl:text-4xl font-bold">Terms of <span className="text-[#019935]"> Use </span></div>
                <div className="text-[#717882] text-base xl:text-xl font-normal text-center mt-4">Effective Date: <span className="text-[#2b3545] font-semibold">19th February, 2022</span>, Last Updated: <span className="text-[#2b3545] font-semibold">19th February,2022</span></div>
                <div className='mt-6 xl:mt-12 flex flex-col gap-6'>
                    {
                        termsOfUsConstData?.map((item, index) => (
                            <div key={index}>
                                <div className="text-[#555d6a] text-xl font-semibold">{index + 1}. {item?.title}</div>
                                {
                                    Array.isArray(item?.description) ? (
                                        <div className="mt-3 text-[#717882] text-base xl:text-lg font-normal leading-7">
                                            {
                                                item?.description?.map((subItem, index) => (
                                                    <p key={index} className={
                                                        cn(
                                                            'xl:mb-7',
                                                            index === item?.description?.length - 1 && 'xl:mb-0'
                                                        )
                                                    }>- {subItem}</p>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className="mt-3 text-[#717882] text-base xl:text-lg font-normal">{item?.description}</div>
                                    )
                                }
                                {
                                    item?.email && (
                                        <div className="text-primary-400 text-lg font-normal leading-7">
                                            {item?.email}
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <ProSeller />
        </div>
    )
}

export default page
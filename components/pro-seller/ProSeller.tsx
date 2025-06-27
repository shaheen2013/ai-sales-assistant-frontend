import Image from 'next/image'
import React from 'react'
import Button from '../button'

const ProSeller = () => {
    return (
        <section>
            <div className="container">
                <div className="max-w-[1100px] mb-16 xl:mb-24 shadow-lg rounded-xl overflow-hidden mx-auto flex lg:flex-row flex-col border-2 border-gray-100 bg-white">
                    {/* left */}
                    <div className=" ">
                        <Image
                            src="/images/become_pro_seller.png"
                            alt="Become Pro Seller"
                            width={480}
                            height={300}
                            className="h-full lg:w-[480px] lg:max-w-[480px] w-full"
                        />
                    </div>

                    {/* right */}
                    <div className="flex-1 lg:p-12 p-6">
                        <h2 className="font-semibold text-4xl mb-6">
                            Become <span className="text-primary-500">Pro</span> Seller!
                        </h2>

                        <p className="text-gray-400 text-lg mb-6">
                            Unlock advanced tools to manage your inventory, attract more
                            buyers, and automate customer interactions—boosting sales with
                            AI-powered efficiency!
                        </p>

                        <Button
                            href="/chat"
                            variant="outline-primary"
                            className="!font-normal text-primary-500"
                        >
                            <span>Start Chart</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                            >
                                <path
                                    d="M11.0002 3.9541C11.9169 9.4541 18.3336 11.2874 18.3336 11.2874M18.3336 11.2874C18.3336 11.2874 11.9169 13.1208 11.0002 18.6208M18.3336 11.2874L3.66689 11.3571"
                                    className="stroke-primary-500"
                                    // stroke="#101010"
                                    strokeWidth="1.1"
                                    strokeLinejoin="bevel"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProSeller
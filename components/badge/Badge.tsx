import { cn } from '@/lib/utils';
import React, { FC } from 'react'

type BadgePropsType = {
    variant: "green" | "red" | "blue" | "purple" | "orange"
    text: string;
    isDot?: boolean;
}

const colors = {
    "green": {
        bgColor: "bg-[#e7f6ef]",
        textColor: "text-[#13c56b]",
        dotColor: "bg-[#13c56b]"
    },
    "red": {
        bgColor: "bg-[#fcecec]",
        textColor: "text-[#ed5e5e]",
        dotColor: "bg-[#ed5e5e]"
    },
    "blue": {
        bgColor: "bg-[#ebf5fd]",
        textColor: "text-[#2196f3]",
        dotColor: "bg-[#2196f3]",
    },
    "purple": {
        bgColor: "bg-[#f0edfc]",
        textColor: "text-[#654ce6]",
        dotColor: "bg-[#654ce6]",
    },
    "orange": {
        bgColor: "bg-[#fff5eb]",
        textColor: "text-[#ffb056]",
        dotColor: "bg-[#ffb056]",
    }
}

const Badge: FC<BadgePropsType> = ({ variant, text, isDot = true }) => {


    return (
        <div className={
            cn(
                "px-2 py-0.5 rounded-2xl flex items-center gap-1 max-w-fit",
                colors[variant].bgColor
            )
        }>
            {
                isDot && <div className={
                    cn(
                        "w-1.5 h-1.5 rounded-full",
                        colors[variant].dotColor
                    )
                } />
            }
            <div className={
                cn(
                    "text-xs font-medium",
                    colors[variant].textColor
                )
            }>{text}</div>
        </div>
    )
}

export default Badge
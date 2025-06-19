import React from "react";
import classNames from "classnames";

interface TimelinePropsSteps {
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelinePropsSteps[];
}

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div>
      {steps.map((step, index) => (
        <div key={index} className="flex lg:gap-9 gap-4 z-10">
          <div className="relative w-14">
            <div
              className={classNames(
                "rounded-full lg:border-[8px] border-[5px] h-14 w-14 flex items-center justify-center text-primary-900 font-bold text-2xl bg-white",
                { "border-primary-500": index === 0 },
                { "border-primary-100": index !== 0 }
              )}
            >
              {index + 1}
            </div>

            {/* horisontal border */}
            {index !== steps.length - 1 && (
              <div className="absolute top-0 left-[25px] h-full bg-primary-100 lg:w-[8px] w-[5px] -z-10"></div>
            )}

            {/* horisontal border 2 */}
            {index == 0 && (
              <div className="absolute top-0 left-[25px] h-full lg:w-[8px] w-[5px] -z-10 bg-gradient-to-t from-primary-100 to-primary-600"></div>
            )}
          </div>

          <div className="pb-9">
            <h2 className="mb-4 text-[#080305] text-2xl font-semibold">
              {step.title}
            </h2>
            <h4 className="text-[#6F6F6F]">{step.description}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

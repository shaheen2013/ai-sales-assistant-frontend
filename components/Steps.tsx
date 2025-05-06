import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
};

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export default function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="flex lg:items-center mb-0 lg:gap-0 gap-3 justify-between w-full flex-col lg:flex-row">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div key={index} className="relative flex-1 flex items-center">
            {/* Connector Line */}
            {!isLastStep && isCompleted && (
              <div className="absolute left-0 top-1/2 w-full h-[6px] rounded-r bg-gray-50 -z-10 transform -translate-y-1/2 hidden lg:flex" />
            )}

            {/* circle */}
            <div
              className={cn(
                "z-10 h-8 w-8 flex items-center justify-center text-xl font-semibold gap-2 text-center rounded-full border transition-all bg-white",
                {
                  "bg-gray-50 text-black": isActive,
                  "bg-green-500 text-white border-green-500": isCompleted,
                }
              )}
            >
              {index + 1}
            </div>

            <span className="text-sm font-medium px-3 bg-white">
              {step.description}
            </span>
          </div>
        );
      })}
    </div>
  );
}

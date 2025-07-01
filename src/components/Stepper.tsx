import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Button } from "./Button";

interface StepperProps {
  steps: React.ReactNode[]
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
  validateStep: (step: number) => boolean
  loading?: boolean
  finalStepLabel?: string
  loadingLabel?: string
  backLabel?: string
}

export const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onStepChange,
    onComplete,
    validateStep,
    loading = false,
    finalStepLabel = "Finish",
    loadingLabel = "Processing...",
    backLabel = "Back"
}) => {
    const totalSteps = steps.length;
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    const canGoBack = currentStep > 0;
    const canGoNext = validateStep(currentStep) && !loading;
  
    const nextLabel = currentStep === totalSteps - 1 
        ? (loading ? loadingLabel : finalStepLabel)
        : "Continue";

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            onStepChange(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            onStepChange(currentStep - 1);
        }
    };

    return (
        <div className={"max-w-2xl mx-auto py-8"}>
            {/* Progress Bar */}
            <div className={"mb-8"}>
                <div className={"flex justify-between items-center mb-4"}>
                    <span className={"text-sm font-medium text-christmas-600"}>
                        {`Step ${currentStep + 1} of ${totalSteps}`}
                    </span>
                    <span className={"text-sm text-gray-500"}>
                        {`${Math.round(progressPercentage)}% Complete`}
                    </span>
                </div>
                <div className={"w-full bg-gray-200 rounded-full h-2 overflow-hidden"}>
                    <div 
                        className={"bg-christmas-600 h-2 rounded-full transition-all duration-500 ease-out"}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className={"bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"}>
                <div className={"min-h-[400px] transition-all duration-300 ease-in-out"}>
                    {steps[currentStep]}
                </div>

                {/* Navigation Buttons */}
                <div className={"flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200"}>
                    <Button
                        variant={"outline"}
                        onClick={handleBack}
                        disabled={!canGoBack}
                        className={cn(
                            "flex items-center gap-2 border-christmas-600 text-christmas-600",
                            !canGoBack && "invisible"
                        )}
                    >
                        <ChevronLeft size={16} />
                        {backLabel}
                    </Button>

                    <Button
                        variant={"red"}
                        onClick={handleNext}
                        disabled={!canGoNext}
                        className={"flex items-center gap-2"}
                    >
                        {nextLabel}
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}; 
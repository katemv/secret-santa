import { ChangeEvent, FC, useState } from "react";

import santaClausAnimation from "../../assets/lottie/santa-claus.json";
import { AnimatedIcon } from "../AnimatedIcon";
import { SelectionButton } from "../SelectionButton";
import { Input } from "../Input";

interface BudgetStepProps {
    budget: number
    setBudget: (budget: number) => void
}

const PRESET_BUDGETS = [50, 75, 100, 150, 200];

export const BudgetStep: FC<BudgetStepProps> = ({ budget, setBudget }) => {
    const [customAmount, setCustomAmount] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(() => {
        return budget > 0 && !PRESET_BUDGETS.includes(budget);
    });

    const handlePresetSelect = (amount: number) => {
        setBudget(amount);
        setShowCustomInput(false);
        setCustomAmount("");
    };

    const handleOtherSelect = () => {
        setShowCustomInput(true);

        if (customAmount) {
            const amount = parseInt(customAmount);

            if (!isNaN(amount) && amount > 0) {
                setBudget(amount);
            }
        }
    };

    const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, ""); // Only allow digits
        setCustomAmount(value);

        const amount = parseInt(value);
        if (!isNaN(amount) && amount > 0) {
            setBudget(amount);
        }
    };

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <AnimatedIcon animationData={santaClausAnimation} />
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"What's your gift budget?"}
                </h2>
                <p className={"text-gray-600 mb-2"}>
                    {"Set a spending limit to keep things fair and fun for everyone!"}
                </p>
            </div>

            <div className={"max-w-md mx-auto"}>
                <div className={"grid grid-cols-2 gap-3 mb-4"}>
                    {PRESET_BUDGETS.map((amount) => (
                        <SelectionButton
                            key={amount}
                            title={`$${amount}`}
                            selected={!showCustomInput && budget === amount}
                            onClick={() => handlePresetSelect(amount)}
                        />
                    ))}

                    <SelectionButton
                        title={"Other"}
                        subtitle={"Custom amount"}
                        selected={showCustomInput}
                        onClick={handleOtherSelect}
                    />
                </div>

                {showCustomInput && (
                    <div className={"mt-4 space-y-2"}>
                        <label className={"block text-md font-medium text-gray-700 font-fields"}>
                            {"Gift amount"}
                        </label>
                        <Input
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder={"Enter a gift amount"}
                            inputSize={"large"}
                            autoFocus
                            fullWidth={true}
                        />
                    </div>
                )}

                {budget > 0 && (
                    <div className={"mt-6 text-center"}>
                        <p className={"text-sm text-gray-500"}>
                            {`Selected budget: $${budget} per person`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}; 
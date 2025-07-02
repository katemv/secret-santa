import { ChangeEvent, FC } from "react";

import santaClausAnimation from "../../assets/lottie/santa-claus.json";
import { AnimatedIcon } from "../AnimatedIcon";
import { Input } from "../Input";

interface NameStepProps {
  ownerName: string
  setOwnerName: (name: string) => void
}

export const NameStep: FC<NameStepProps> = ({ ownerName, setOwnerName }) => {
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setOwnerName(capitalizedValue);
    };

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <AnimatedIcon animationData={santaClausAnimation} />
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"What's your name?"}
                </h2>
                <p className={"text-gray-600"}>
                    {"Let's start by getting to know you, the organizer of this Secret Santa!"}
                </p>
            </div>

            <div className={"max-w-md mx-auto"}>
                <Input
                    value={ownerName}
                    onChange={handleNameChange}
                    placeholder={"Enter your full name"}
                    centered={true}
                    inputSize={"large"}
                    autoFocus
                />
            </div>
        </div>
    );
}; 
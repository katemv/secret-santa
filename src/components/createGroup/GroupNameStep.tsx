import { ChangeEvent, FC } from "react";

import { Input } from "../Input";
import { AnimatedIcon } from "../AnimatedIcon";
import glassOrnamentsAnimation from "../../assets/lottie/glass-ornaments.json";

interface GroupNameStepProps {
  groupName: string
  setGroupName: (name: string) => void
  organizerName: string
}

export const GroupNameStep: FC<GroupNameStepProps> = ({ groupName, setGroupName, organizerName }) => {
    const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setGroupName(capitalizedValue);
    };

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <AnimatedIcon animationData={glassOrnamentsAnimation} />
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"What would you like to name your group?"}
                </h2>
                <p className={"text-gray-600 mb-2"}>
                    {"Give your Secret Santa group a festive name that everyone will remember!"}
                </p>
            </div>

            <div className={"max-w-md mx-auto"}>
                <Input
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder={`${organizerName}'s Secret Santa`}
                    centered={true}
                    inputSize={"large"}
                    autoFocus
                />
                <div className={"mt-3 text-center"}>
                    <p className={"text-xs text-gray-500"}>
                        {"This name will be visible to all group members"}
                    </p>
                </div>
            </div>
        </div>
    );
}; 
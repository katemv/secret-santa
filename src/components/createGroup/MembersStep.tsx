import { Plus, X } from "lucide-react";
import { FC } from "react";

import { cn } from "@/lib/utils.ts";
import sleighAnimation from "../../assets/lottie/sleigh.json";
import { AnimatedIcon } from "../AnimatedIcon";
import { Button } from "../ui/button";
import { Input } from "../Input";

interface MembersStepProps {
  memberNames: string[]
  updateMemberName: (index: number, value: string) => void
  addMemberField: () => void
  removeMemberField: (index: number) => void
  organizerName: string
}

export const MembersStep: FC<MembersStepProps> = ({
    memberNames,
    updateMemberName,
    addMemberField,
    removeMemberField,
    organizerName
}) => {
    const filledCount = memberNames.filter(name => name.trim().length > 0).length;

    const handleMemberNameChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        updateMemberName(index, capitalizedValue);
    };

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <AnimatedIcon animationData={sleighAnimation} />
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"Who do you want to celebrate with?"}
                </h2>
                <p className={"text-gray-600 mb-2"}>
                    {"Add the names of people who will be members in your Secret Santa"}
                </p>
            </div>

            <div className={"max-w-md mx-auto space-y-3"}>
                <div className={"mb-4"}>
                    <label className={"block text-sm font-medium text-gray-700 mb-2"}>
                        {"Organizer (You)"}
                    </label>
                    <Input
                        value={organizerName}
                        onChange={() => {}}
                        disabled={true}
                        placeholder={"Organizer name"}
                        className={"bg-gray-50"}
                        fullWidth={true}
                    />
                </div>

                {memberNames.map((name, index) => (
                    <div key={index} className={"relative"}>
                        <Input
                            value={name}
                            onChange={(e) => handleMemberNameChange(index, e)}
                            placeholder={`Member ${index + 1} name`}
                            className={index >= 2 ? "pr-10" : ""}
                            fullWidth={true}
                        />
                        {index >= 2 && (
                            <button
                                type={"button"}
                                onClick={() => removeMemberField(index)}
                                className={cn("absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                                    "hover:text-red-500 transition-colors")}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}

                <Button
                    variant={"dashed"}
                    onClick={addMemberField}
                    className={"w-full gap-2"}
                    size={"md"}
                >
                    <Plus size={20} />
                    {"Add another member"}
                </Button>
            </div>

            {filledCount < 2 && (
                <div className={"mt-6 text-center"}>
                    <p className={"text-sm text-gray-500"}>
                        {"You need at least 2 members to create a Secret Santa group"}
                    </p>
                </div>
            )}
        </div>
    );
}; 
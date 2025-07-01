import { Plus, X, User } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";

interface MembersStepProps {
  memberNames: string[]
  updateMemberName: (index: number, value: string) => void
  addMemberField: () => void
  removeMemberField: (index: number) => void
}

export const MembersStep: React.FC<MembersStepProps> = ({
    memberNames,
    updateMemberName,
    addMemberField,
    removeMemberField
}) => {
    const filledCount = memberNames.filter(name => name.trim().length > 0).length;

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <div className={"w-16 h-16 bg-christmas-100 rounded-full flex items-center justify-center mx-auto mb-4"}>
                    <User className={"w-8 h-8 text-christmas-600"} />
                </div>
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"Who do you want to celebrate with?"}
                </h2>
                <p className={"text-gray-600 mb-2"}>
                    {"Add the names of people who will be members in your Secret Santa"}
                </p>
            </div>

            <div className={"max-w-md mx-auto space-y-3"}>
                {memberNames.map((name, index) => (
                    <div key={index} className={"flex gap-2"}>
                        <Input
                            value={name}
                            onChange={(e) => updateMemberName(index, e.target.value)}
                            placeholder={`Member ${index + 1} name`}
                            className={"flex-1"}
                            fullWidth={false}
                        />
                        {memberNames.length > 5 && (
                            <button
                                type={"button"}
                                onClick={() => removeMemberField(index)}
                                className={
                                    "w-12 h-12 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                }
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                ))}

                <Button
                    variant={"dashed"}
                    onClick={addMemberField}
                    className={"w-full gap-2"}
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
import { User } from "lucide-react";
import { Input } from "../Input";

interface NameStepProps {
  ownerName: string
  setOwnerName: (name: string) => void
}

export const NameStep: React.FC<NameStepProps> = ({
    ownerName,
    setOwnerName
}) => {
    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <div className={"w-16 h-16 bg-christmas-100 rounded-full flex items-center justify-center mx-auto mb-4"}>
                    <User className={"w-8 h-8 text-christmas-600"} />
                </div>
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
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder={"Enter your full name"}
                    centered={true}
                    inputSize={"large"}
                    autoFocus
                />
            </div>
        </div>
    );
}; 
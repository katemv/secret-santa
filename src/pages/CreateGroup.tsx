import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stepper } from "../components/Stepper";
import { NameStep, MembersStep } from "../components/createGroup";

const CreateGroup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Form data state
    const [ownerName, setOwnerName] = useState("");
    const [memberNames, setMemberNames] = useState<string[]>(["", "", "", "", ""]);

    const validateStep = (step: number) => {
        switch (step) {
        case 0:
            return ownerName.trim().length > 0;
        case 1:
            const filledMembers = memberNames.filter(name => name.trim().length > 0);
            return filledMembers.length >= 2;
        default:
            return false;
        }
    };

    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    };

    const addMemberField = () => {
        setMemberNames(prev => [...prev, ""]);
    };

    const removeMemberField = (index: number) => {
        setMemberNames(prev => prev.filter((_, i) => i !== index));
    };

    const updateMemberName = (index: number, value: string) => {
        setMemberNames(prev => 
            prev.map((name, i) => i === index ? value : name)
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const filledMembers = memberNames.filter(name => name.trim().length > 0);
            
            const response = await axios.post("/api/groups", {
                name: `${ownerName}'s Secret Santa`,
                description: `A festive gift exchange organized by ${ownerName}`,
                exchangeDate: "2024-12-25", // Default Christmas date
                budget: 25, // Default budget
                ownerName: ownerName.trim(),
                ownerEmail: "temp@example.com", // Temporary - will be handled by backend later
                members: filledMembers.map(name => name.trim()),
            });

            const group = response.data;
            navigate(`/group/${group._id}`, { 
                state: { groupCode: group.code, isCreator: true } 
            });
        // eslint-disable-next-line
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create group");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className={"min-h-screen bg-gray-50"}>
            <div className={"pt-8 pb-4 text-center"}>
                <h1 className={"text-3xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"Create Your Secret Santa"}
                </h1>
                <p className={"text-gray-600"}>
                    {"Set up a magical gift exchange in just a few simple steps!"}
                </p>
            </div>

            {error && (
                <div className={"max-w-2xl mx-auto mb-4 px-4"}>
                    <div className={"bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg"}>
                        {error}
                    </div>
                </div>
            )}

            <Stepper
                steps={[
                    <NameStep 
                        ownerName={ownerName}
                        setOwnerName={setOwnerName}
                    />,
                    <MembersStep 
                        memberNames={memberNames}
                        updateMemberName={updateMemberName}
                        addMemberField={addMemberField}
                        removeMemberField={removeMemberField}
                    />
                ]}
                currentStep={currentStep}
                onStepChange={handleStepChange}
                onComplete={handleSubmit}
                validateStep={validateStep}
                loading={loading}
                finalStepLabel={"Create Group"}
                loadingLabel={"Creating..."}
            />
        </div>
    );
};

export default CreateGroup; 
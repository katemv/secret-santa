import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BudgetStep, CelebrationDateStep, GroupNameStep, MembersStep, NameStep } from "@/components/createGroup";
import usePersistedState from "../hooks/usePersistedState";
import { Stepper } from "../components/Stepper";

const CreateGroup = () => {
    const navigate = useNavigate();
    
    const [currentStep, setCurrentStep, clearCurrentStep] = usePersistedState("createGroup_currentStep", 0);
    const [ownerName, setOwnerName, clearOwnerName] = usePersistedState("createGroup_ownerName", "");
    const [memberNames, setMemberNames, clearMemberNames] = usePersistedState<string[]>("createGroup_memberNames", ["", ""]);
    const [groupName, setGroupName, clearGroupName] = usePersistedState("createGroup_groupName", `Christmas ${new Date().getFullYear()}`);
    const [celebrationDate, setCelebrationDate, clearCelebrationDate] = usePersistedState("createGroup_celebrationDate", `${new Date().getFullYear()}-12-25`);
    const [budget, setBudget, clearBudget] = usePersistedState("createGroup_budget", 0);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const clearAllPersistedData = () => {
        clearCurrentStep();
        clearOwnerName();
        clearMemberNames();
        clearGroupName();
        clearCelebrationDate();
        clearBudget();
    };

    const validateStep = (step: number) => {
        switch (step) {
        case 0:
            return ownerName.trim().length > 0;
        case 1: {
            const filledMembers = memberNames.filter(name => name.trim().length > 0);

            if (filledMembers.length < 2) {
                return false;
            }

            const allNames = [ownerName, ...filledMembers]
                .map(name => name.trim().toLowerCase())
                .filter(name => name.length > 0);

            const uniqueNames = [...new Set(allNames)];
            return uniqueNames.length === allNames.length;
        }
        case 2:
            return groupName.trim().length > 0;
        case 3:
            return celebrationDate.trim().length > 0;
        case 4:
            return budget > 0;
        default:
            return false;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const filledMembers = memberNames.filter(name => name.trim().length > 0);
            
            const response = await axios.post("/api/groups", {
                name: groupName.trim(),
                description: `A festive gift exchange organized by ${ownerName}`,
                exchangeDate: celebrationDate,
                budget: budget,
                ownerName: ownerName.trim(),
                ownerEmail: "temp@example.com", // Temporary - will be handled by backend later
                members: filledMembers.map(name => name.trim()),
            });

            const group = response.data;
            
            clearAllPersistedData();
            
            navigate(`/group/${group._id}`, { 
                state: { groupCode: group.code, isCreator: true } 
            });
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
                        organizerName={ownerName}
                        addMemberField={() => setMemberNames(prev => [...prev, ""])}
                        removeMemberField={(index) => setMemberNames(prev => prev.filter((_, i) => i !== index))}
                        updateMemberName={(index, value) => {
                            setMemberNames(prev =>
                                prev.map((name, i) => i === index ? value : name)
                            );
                        }}
                    />,
                    <GroupNameStep 
                        groupName={groupName}
                        setGroupName={setGroupName}
                        organizerName={ownerName}
                    />,
                    <CelebrationDateStep 
                        selectedDate={celebrationDate}
                        setSelectedDate={setCelebrationDate}
                    />,
                    <BudgetStep 
                        budget={budget}
                        setBudget={setBudget}
                    />
                ]}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
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
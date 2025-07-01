import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Gift, Mail, User, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "../components/Button";

const JoinGroup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter code, 2: Fill details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [group, setGroup] = useState<any>(null);
    const [groupCode, setGroupCode] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        giftPreferences: "",
    });

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/api/groups/code/${groupCode}`);
            setGroup(response.data);
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.message || "Group not found");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/members", {
                ...formData,
                groupCode,
            });

            const member = response.data;
            navigate(`/reveal/${member.uniqueId}`, {
                state: { justJoined: true }
            });
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to join group");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={"max-w-2xl mx-auto"}>
            <div className={"text-center mb-8"}>
                <div className={"text-4xl mb-4"}>🎅</div>
                <h1 className={"text-3xl font-bold text-forest-800 mb-2"}>{"Join a Secret Santa Group"}</h1>
                <p className={"text-forest-600"}>
                    {"Enter your group code and details to join the gift exchange fun!"}
                </p>
            </div>

            {step === 1 && (
                <form onSubmit={handleCodeSubmit} className={"cozy-card"}>
                    {error && (
                        <div className={"bg-christmas-100 border border-christmas-300 text-christmas-700 px-4 py-3 mb-6 flex items-center gap-2"}>
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className={"space-y-6"}>
                        <div>
                            <label htmlFor={"groupCode"} className={"block text-forest-700 font-medium mb-2"}>
                                <Gift size={18} className={"inline mr-2"} />
                                {"Group Code"}
                            </label>
                            <input
                                type={"text"}
                                id={"groupCode"}
                                value={groupCode}
                                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                                placeholder={"Enter your group code..."}
                                required
                                className={"cozy-input text-center text-lg font-mono tracking-wider"}
                                maxLength={8}
                            />
                            <p className={"text-forest-500 text-sm mt-2"}>
                                {"Ask the group creator for the invitation code"}
                            </p>
                        </div>

                        <Button
                            type={"submit"}
                            disabled={loading}
                            className={"w-full"}
                            size={"lg"}
                        >
                            {loading ? "Finding Group..." : "Find Group 🔍"}
                        </Button>
                    </div>
                </form>
            )}

            {step === 2 && group && (
                <div className={"space-y-6"}>
                    {/* Group Info */}
                    <div className={"cozy-card bg-forest-50"}>
                        <div className={"flex items-center gap-2 text-forest-700 mb-2"}>
                            <CheckCircle size={20} />
                            <span className={"font-medium"}>{"Group Found!"}</span>
                        </div>
                        <h2 className={"text-xl font-bold text-forest-800 mb-2"}>{group.name}</h2>
                        <p className={"text-forest-600 mb-3"}>{group.description}</p>
                        <div className={"flex flex-wrap gap-4 text-sm text-forest-600"}>
                            <span>{"📅 Exchange: " + new Date(group.exchangeDate).toLocaleDateString()}</span>
                            <span>{"💰 Budget: $" + group.budget}</span>
                        </div>
                    </div>

                    {/* Join Form */}
                    <form onSubmit={handleJoinSubmit} className={"cozy-card"}>
                        {error && (
                            <div className={"bg-christmas-100 border border-christmas-300 text-christmas-700 px-4 py-3 mb-6 flex items-center gap-2"}>
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className={"space-y-6"}>
                            <div>
                                <label htmlFor={"name"} className={"block text-forest-700 font-medium mb-2"}>
                                    <User size={18} className={"inline mr-2"} />
                                    {"Your Name"}
                                </label>
                                <input
                                    type={"text"}
                                    id={"name"}
                                    name={"name"}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={"Enter your full name"}
                                    required
                                    className={"cozy-input"}
                                />
                            </div>

                            <div>
                                <label htmlFor={"email"} className={"block text-forest-700 font-medium mb-2"}>
                                    <Mail size={18} className={"inline mr-2"} />
                                    {"Email Address"}
                                </label>
                                <input
                                    type={"email"}
                                    id={"email"}
                                    name={"email"}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={"your@email.com"}
                                    required
                                    className={"cozy-input"}
                                />
                            </div>

                            <div>
                                <label htmlFor={"giftPreferences"} className={"block text-forest-700 font-medium mb-2"}>
                                    <MessageSquare size={18} className={"inline mr-2"} />
                                    {"Gift Preferences"}
                                </label>
                                <textarea
                                    id={"giftPreferences"}
                                    name={"giftPreferences"}
                                    value={formData.giftPreferences}
                                    onChange={handleChange}
                                    placeholder={"Tell your Secret Santa what you'd love to receive! Include your interests, hobbies, favorite colors, sizes, or anything helpful..."}
                                    rows={4}
                                    required
                                    className={"cozy-textarea"}
                                />
                            </div>

                            <div className={"flex gap-3"}>
                                <Button
                                    type={"button"}
                                    onClick={() => setStep(1)}
                                    variant={"outline"}
                                    size={"md"}
                                >
                                    {"Back"}
                                </Button>
                                <Button
                                    type={"submit"}
                                    disabled={loading}
                                    className={"flex-1"}
                                    size={"md"}
                                >
                                    {loading ? "Joining Group..." : "Join Group 🎁"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default JoinGroup; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, DollarSign, Users, AlertCircle } from "lucide-react";

const CreateGroup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        exchangeDate: "",
        budget: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/groups", {
                ...formData,
                budget: parseFloat(formData.budget),
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={"max-w-2xl mx-auto"}>
            <div className={"text-center mb-8"}>
                <div className={"text-4xl mb-4"}>🎁</div>
                <h1 className={"text-3xl font-bold text-forest-800 mb-2"}>{"Create Your Secret Santa Group"}</h1>
                <p className={"text-forest-600"}>
                    {"Set up a new gift exchange and invite your friends and family to join the fun!"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className={"cozy-card"}>
                {error && (
                    <div className={"bg-christmas-100 border border-christmas-300 text-christmas-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <div className={"space-y-6"}>
                    <div>
                        <label htmlFor={"name"} className={"block text-forest-700 font-medium mb-2"}>
                            <Users size={18} className={"inline mr-2"} />
                            {"Group Name"}
                        </label>
                        <input
                            type={"text"}
                            id={"name"}
                            name={"name"}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={"e.g., \"Smith Family Christmas 2024\""}
                            required
                            className={"cozy-input"}
                        />
                    </div>

                    <div>
                        <label htmlFor={"description"} className={"block text-forest-700 font-medium mb-2"}>
                            {"Description"}
                        </label>
                        <textarea
                            id={"description"}
                            name={"description"}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder={"Tell everyone what this gift exchange is about..."}
                            rows={3}
                            required
                            className={"cozy-textarea"}
                        />
                    </div>

                    <div className={"grid md:grid-cols-2 gap-4"}>
                        <div>
                            <label htmlFor={"exchangeDate"} className={"block text-forest-700 font-medium mb-2"}>
                                <Calendar size={18} className={"inline mr-2"} />
                                {"Exchange Date"}
                            </label>
                            <input
                                type={"date"}
                                id={"exchangeDate"}
                                name={"exchangeDate"}
                                value={formData.exchangeDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                className={"cozy-input"}
                            />
                        </div>

                        <div>
                            <label htmlFor={"budget"} className={"block text-forest-700 font-medium mb-2"}>
                                <DollarSign size={18} className={"inline mr-2"} />
                                {"Budget ($)"}
                            </label>
                            <input
                                type={"number"}
                                id={"budget"}
                                name={"budget"}
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder={"25"}
                                min={"1"}
                                step={"1"}
                                required
                                className={"cozy-input"}
                            />
                        </div>
                    </div>

                    <button
                        type={"submit"}
                        disabled={loading}
                        className={"cozy-button w-full disabled:opacity-50 disabled:cursor-not-allowed"}
                    >
                        {loading ? "Creating Group..." : "Create Group 🎄"}
                    </button>
                </div>
            </form>

            <div className={"mt-6 text-center text-forest-600 text-sm"}>
                <p>{"After creating your group, you'll get a unique code to share with participants!"}</p>
            </div>
        </div>
    );
};

export default CreateGroup; 
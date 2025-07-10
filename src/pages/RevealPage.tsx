import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Gift, Calendar, DollarSign, Heart, AlertCircle, CheckCircle } from "lucide-react";

interface Assignment {
  participant: {
    name: string
    email: string
    groupId: {
      name: string
      description: string
      exchangeDate: string
      budget: number
    }
  }
  recipient: {
    name: string
    giftPreferences: string
  }
  group: {
    name: string
    description: string
    exchangeDate: string
    budget: number
  }
}

const RevealPage = () => {
    const { uniqueId } = useParams();
    const location = useLocation();
    const { justJoined } = location.state || {};
  
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAssignment();
    }, [uniqueId]);

    const fetchAssignment = async () => {
        try {
            const response = await axios.get(`/api/assignments/reveal/${uniqueId}`);
            setAssignment(response.data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError(err.response.data.message);
            } else {
                setError("Failed to load assignment");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={"flex items-center justify-center min-h-64"}>
                <div className={"text-center"}>
                    <div className={"text-4xl mb-4"}>🎄</div>
                    <p className={"text-white"}>{"Loading your assignment..."}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={"max-w-2xl mx-auto text-center"}>
                <div className={"cozy-card bg-white/95 border-christmas-200"}>
                    <div className={"text-4xl mb-4"}>🎅</div>
                    <h1 className={"text-2xl font-bold text-christmas-800 mb-4"}>
                        {error.includes("not found") ? "Assignment Not Ready" : "Oops!"}
                    </h1>
                    <div className={"bg-christmas-100 border border-christmas-300 text-christmas-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                    <p className={"text-christmas-600"}>
                        {error.includes("not found") 
                            ? "The Secret Santa assignments haven't been generated yet. Check back later or contact your group organizer!"
                            : "Something went wrong. Please try again later or contact support."
                        }
                    </p>
                </div>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className={"text-center"}>
                <div className={"text-4xl mb-4"}>❌</div>
                <h1 className={"text-2xl font-bold text-white mb-2"}>{"Assignment Not Found"}</h1>
                <p className={"text-white opacity-80"}>{"This assignment link is invalid or has expired."}</p>
            </div>
        );
    }

    return (
        <div className={"max-w-3xl mx-auto space-y-8"}>
            {/* Welcome Message */}
            {justJoined && (
                <div className={"cozy-card bg-green-50 border-green-200"}>
                    <div className={"flex items-center gap-2 text-green-700 mb-2"}>
                        <CheckCircle size={20} />
                        <span className={"font-medium"}>{"Welcome to the Group!"}</span>
                    </div>
                    <p className={"text-green-600"}>
                        {"You've successfully joined " + assignment.group.name + ". Save this page - it's your unique link to see your Secret Santa assignment!"}
                    </p>
                </div>
            )}

            {/* Group Info */}
            <div className={"cozy-card bg-white/95 border-christmas-200"}>
                <h1 className={"text-2xl font-bold text-christmas-800 mb-2"}>{assignment.group.name}</h1>
                <p className={"text-christmas-600 mb-4"}>{assignment.group.description}</p>
                <div className={"grid md:grid-cols-2 gap-4"}>
                    <div className={"flex items-center gap-2 text-christmas-600"}>
                        <Calendar size={18} />
                        <span>{"Exchange: " + new Date(assignment.group.exchangeDate).toLocaleDateString()}</span>
                    </div>
                    <div className={"flex items-center gap-2 text-christmas-600"}>
                        <DollarSign size={18} />
                        <span>{"Budget: $" + assignment.group.budget}</span>
                    </div>
                </div>
            </div>

            {/* Assignment Reveal */}
            <div className={"cozy-card bg-white/95 border-christmas-200 text-center"}>
                <div className={"text-6xl mb-6"}>🎁</div>
                <h2 className={"text-3xl font-bold text-christmas-800 mb-4"}>
                    {"Ho ho ho, " + assignment.participant.name + "!"}
                </h2>
                <p className={"text-xl text-christmas-600 mb-8"}>
                    {"You are the Secret Santa for..."}
                </p>
        
                <div className={"bg-christmas-50 border-2 border-christmas-200 rounded-lg p-8 mb-6"}>
                    <div className={"text-4xl mb-4"}>🎅</div>
                    <h3 className={"text-4xl font-bold text-christmas-700 mb-2"}>
                        {assignment.recipient.name}
                    </h3>
                    <div className={"inline-flex items-center gap-2 text-christmas-600 text-lg"}>
                        <Heart size={20} />
                        <span>{"Your gift recipient!"}</span>
                    </div>
                </div>

                <div className={"text-left"}>
                    <h4 className={"text-xl font-bold text-christmas-800 mb-3 flex items-center gap-2"}>
                        <Gift size={20} />
                        {"Gift Preferences"}
                    </h4>
                    <div className={"bg-white border border-christmas-100 rounded-lg p-4"}>
                        <p className={"text-christmas-700 whitespace-pre-wrap leading-relaxed"}>
                            {assignment.recipient.giftPreferences}
                        </p>
                    </div>
                </div>
            </div>

            {/* Shopping Tips */}
            <div className={"cozy-card bg-white/90 border-christmas-200"}>
                <h3 className={"text-xl font-bold text-christmas-800 mb-4"}>{"🛍️ Shopping Tips"}</h3>
                <div className={"space-y-3 text-christmas-600"}>
                    <p>{"• Keep the budget in mind: $" + assignment.group.budget}</p>
                    <p>{"• Use their preferences as a guide, but feel free to get creative!"}</p>
                    <p>{"• Consider their hobbies, interests, and personality"}</p>
                    <p>{"• Don't forget to keep it a secret until the exchange!"}</p>
                    <p>{"• Have fun with it - the thought counts most! 🎄"}</p>
                </div>
            </div>

            {/* AI Assistant Teaser */}
            <div className={"cozy-card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"}>
                <div className={"text-center"}>
                    <div className={"text-3xl mb-3"}>✨</div>
                    <h3 className={"text-xl font-bold text-purple-800 mb-2"}>{"AI Gift Assistant Coming Soon!"}</h3>
                    <p className={"text-purple-600 mb-4"}>
                        {"Get personalized gift suggestions based on " + assignment.recipient.name + "'s preferences using our AI-powered assistant."}
                    </p>
                    <button 
                        disabled 
                        className={"px-6 py-3 bg-purple-300 text-purple-600 rounded-lg cursor-not-allowed opacity-75"}
                    >
                        {"Coming Soon 🔮"}
                    </button>
                </div>
            </div>

            {/* Save This Page */}
            <div className={"text-center text-white opacity-90"}>
                <p className={"text-sm"}>
                    {"💡 Bookmark this page! This is your unique link to access your Secret Santa assignment."}
                </p>
            </div>
        </div>
    );
};

export default RevealPage; 
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Users, Calendar, DollarSign, Copy, CheckCircle, AlertCircle, Shuffle } from "lucide-react";

interface Group {
  _id: string
  name: string
  description: string
  exchangeDate: string
  budget: number
  code: string
}

interface Participant {
  _id: string
  name: string
  email: string
  createdAt: string
}

const GroupDashboard = () => {
    const { groupId } = useParams();
    const location = useLocation();
    const { groupCode, isCreator } = location.state || {};
  
    const [group, setGroup] = useState<Group | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [assignmentStatus, setAssignmentStatus] = useState({
        assignmentsGenerated: false,
        assignmentCount: 0,
        participantCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [copying, setCopying] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchGroupData();
        fetchParticipants();
        fetchAssignmentStatus();
    }, [groupId]);

    const fetchGroupData = async () => {
        try {
            const response = await axios.get(`/api/groups/${groupId}`);
            setGroup(response.data);
        } catch (err) {
            setError("Failed to load group data");
        }
    };

    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`/api/participants/group/${groupId}`);
            setParticipants(response.data);
        } catch (err) {
            console.error("Failed to load participants");
        }
    };

    const fetchAssignmentStatus = async () => {
        try {
            const response = await axios.get(`/api/assignments/status/${groupId}`);
            setAssignmentStatus(response.data);
        } catch (err) {
            console.error("Failed to load assignment status");
        } finally {
            setLoading(false);
        }
    };

    const copyGroupCode = async () => {
        setCopying(true);
        try {
            await navigator.clipboard.writeText(group?.code || groupCode);
            setTimeout(() => setCopying(false), 2000);
        } catch (err) {
            setCopying(false);
        }
    };

    const generateAssignments = async () => {
        setGenerating(true);
        setError("");
    
        try {
            await axios.post(`/api/assignments/generate/${groupId}`);
            fetchAssignmentStatus();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to generate assignments");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className={"flex items-center justify-center min-h-64"}>
                <div className={"text-center"}>
                    <div className={"text-4xl mb-4"}>🎄</div>
                    <p className={"text-forest-600"}>{"Loading group details..."}</p>
                </div>
            </div>
        );
    }

    if (!group) {
        return (
            <div className={"text-center"}>
                <div className={"text-4xl mb-4"}>❌</div>
                <h1 className={"text-2xl font-bold text-forest-800 mb-2"}>{"Group Not Found"}</h1>
                <p className={"text-forest-600"}>{"This group doesn't exist or has been deleted."}</p>
            </div>
        );
    }

    return (
        <div className={"max-w-4xl mx-auto space-y-8"}>
            {/* Group Header */}
            <div className={"cozy-card"}>
                <div className={"flex items-start justify-between mb-4"}>
                    <div>
                        <h1 className={"text-3xl font-bold text-forest-800 mb-2"}>{group.name}</h1>
                        <p className={"text-forest-600 mb-4"}>{group.description}</p>
                    </div>
                    <div className={"text-right"}>
                        <div className={"text-sm text-forest-500"}>{"Group Code"}</div>
                        <div className={"flex items-center gap-2"}>
                            <code className={"text-xl font-mono font-bold text-christmas-600 bg-christmas-50 px-3 py-1 rounded"}>
                                {group.code}
                            </code>
                            <button
                                onClick={copyGroupCode}
                                className={"p-2 text-forest-600 hover:text-forest-800 transition-colors"}
                                title={"Copy group code"}
                            >
                                {copying ? <CheckCircle size={20} className={"text-green-600"} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"grid md:grid-cols-3 gap-4"}>
                    <div className={"flex items-center gap-2 text-forest-600"}>
                        <Calendar size={18} />
                        <span>{"Exchange: " + new Date(group.exchangeDate).toLocaleDateString()}</span>
                    </div>
                    <div className={"flex items-center gap-2 text-forest-600"}>
                        <DollarSign size={18} />
                        <span>{"Budget: $" + group.budget}</span>
                    </div>
                    <div className={"flex items-center gap-2 text-forest-600"}>
                        <Users size={18} />
                        <span>{participants.length + " participant" + (participants.length !== 1 ? "s" : "")}</span>
                    </div>
                </div>
            </div>

            {/* Participants */}
            <div className={"cozy-card"}>
                <h2 className={"text-2xl font-bold text-forest-800 mb-4"}>{"Participants"}</h2>
                {participants.length === 0 ? (
                    <div className={"text-center py-8"}>
                        <div className={"text-4xl mb-4"}>👥</div>
                        <p className={"text-forest-600"}>{"No participants yet. Share the group code to get started!"}</p>
                    </div>
                ) : (
                    <div className={"grid gap-3"}>
                        {participants.map((participant) => (
                            <div key={participant._id} className={"flex items-center justify-between p-3 bg-forest-50 rounded-lg"}>
                                <div>
                                    <div className={"font-medium text-forest-800"}>{participant.name}</div>
                                    <div className={"text-sm text-forest-600"}>{participant.email}</div>
                                </div>
                                <div className={"text-xs text-forest-500"}>
                                    {"Joined " + new Date(participant.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Assignment Management */}
            {isCreator && (
                <div className={"cozy-card"}>
                    <h2 className={"text-2xl font-bold text-forest-800 mb-4"}>{"Secret Santa Assignments"}</h2>
          
                    {error && (
                        <div className={"bg-christmas-100 border border-christmas-300 text-christmas-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"}>
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    {assignmentStatus.assignmentsGenerated ? (
                        <div className={"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"}>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <CheckCircle size={20} />
                                <span className={"font-medium"}>{"Assignments Generated!"}</span>
                            </div>
                            <p className={"text-sm"}>
                                {"Secret Santa assignments have been created for all " + assignmentStatus.assignmentCount + " participants. Each participant can now visit their unique link to see who they're shopping for!"}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p className={"text-forest-600 mb-4"}>
                                {"Generate Secret Santa assignments when all participants have joined. You need at least 2 participants."}
                            </p>
                            <button
                                onClick={generateAssignments}
                                disabled={participants.length < 2 || generating}
                                className={"cozy-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"}
                            >
                                <Shuffle size={18} />
                                {generating ? "Generating..." : "Generate Assignments 🎲"}
                            </button>
                            {participants.length < 2 && (
                                <p className={"text-sm text-forest-500 mt-2"}>
                                    {"Need at least 2 participants to generate assignments"}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Instructions */}
            <div className={"cozy-card bg-cream-50"}>
                <h2 className={"text-xl font-bold text-forest-800 mb-3"}>{"Next Steps"}</h2>
                <div className={"space-y-2 text-forest-600"}>
                    <p>{"1. Share the group code with all participants"}</p>
                    <p>{"2. Wait for everyone to join and add their gift preferences"}</p>
                    {isCreator && <p>{"3. Generate Secret Santa assignments when ready"}</p>}
                    <p>{isCreator ? "4." : "3."} Each participant will get a unique link to see their assignment</p>
                </div>
            </div>
        </div>
    );
};

export default GroupDashboard; 
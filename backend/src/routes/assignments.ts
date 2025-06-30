import express, { Request, Response } from "express";
import Assignment from "../models/Assignment";
import Participant from "../models/Participant";

const router = express.Router();

// Generate assignments for a group
router.post("/generate/:groupId", async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;

        // Check if assignments already exist for this group
        const existingAssignments = await Assignment.find({ groupId });
        if (existingAssignments.length > 0) {
            return res.status(400).json({ message: "Assignments already exist for this group" });
        }

        // Get all participants in the group
        const participants = await Participant.find({ groupId });
        if (participants.length < 2) {
            return res.status(400).json({ message: "Need at least 2 participants to generate assignments" });
        }

        // Shuffle participants for random assignment
        const shuffledReceivers = [...participants].sort(() => Math.random() - 0.5);

        // Create assignments ensuring no one gets themselves
        const assignments = [];
        for (let i = 0; i < participants.length; i++) {
            const receiverIndex = i;
      
            // If someone got themselves, swap with the next person
            if (participants[i]._id.equals(shuffledReceivers[receiverIndex]._id)) {
                const nextIndex = (i + 1) % participants.length;
                const temp = shuffledReceivers[receiverIndex];
                shuffledReceivers[receiverIndex] = shuffledReceivers[nextIndex];
                shuffledReceivers[nextIndex] = temp;
            }

            const assignment = new Assignment({
                groupId,
                giverId: participants[i]._id,
                receiverId: shuffledReceivers[receiverIndex]._id,
            });

            assignments.push(assignment);
        }

        // Save all assignments
        await Assignment.insertMany(assignments);

        res.json({ message: "Assignments generated successfully", count: assignments.length });
    } catch (error) {
        console.error("Error generating assignments:", error);
        res.status(500).json({ message: "Failed to generate assignments" });
    }
});

// Get assignment for a participant (reveal page)
router.get("/reveal/:uniqueId", async (req: Request, res: Response) => {
    try {
        const { uniqueId } = req.params;

        // Find the participant
        const participant = await Participant.findOne({ uniqueId })
            .populate("groupId", "name description exchangeDate budget");

        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        // Find the assignment
        const assignment = await Assignment.findOne({
            groupId: participant.groupId._id,
            giverId: participant._id,
        }).populate("receiverId", "name giftPreferences");

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found. Assignments may not be generated yet." });
        }

        res.json({
            participant,
            recipient: assignment.receiverId,
            group: participant.groupId,
        });
    } catch (error) {
        console.error("Error fetching assignment:", error);
        res.status(500).json({ message: "Failed to fetch assignment" });
    }
});

// Check if assignments exist for a group
router.get("/status/:groupId", async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const assignmentCount = await Assignment.countDocuments({ groupId });
        const participantCount = await Participant.countDocuments({ groupId });

        res.json({
            assignmentsGenerated: assignmentCount > 0,
            assignmentCount,
            participantCount,
        });
    } catch (error) {
        console.error("Error checking assignment status:", error);
        res.status(500).json({ message: "Failed to check assignment status" });
    }
});

export default router; 
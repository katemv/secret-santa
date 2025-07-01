import express, { Request, Response } from "express";
import Assignment from "../models/Assignment";
import Member from "../models/Member";

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

        // Get all members in the group
        const members = await Member.find({ groupId });
        if (members.length < 2) {
            return res.status(400).json({ message: "Need at least 2 members to generate assignments" });
        }

        // Shuffle members for random assignment
        const shuffledReceivers = [...members].sort(() => Math.random() - 0.5);

        // Create assignments ensuring no one gets themselves
        const assignments = [];
        for (let i = 0; i < members.length; i++) {
            const receiverIndex = i;
      
            // If someone got themselves, swap with the next person
            if (members[i]._id.equals(shuffledReceivers[receiverIndex]._id)) {
                const nextIndex = (i + 1) % members.length;
                const temp = shuffledReceivers[receiverIndex];
                shuffledReceivers[receiverIndex] = shuffledReceivers[nextIndex];
                shuffledReceivers[nextIndex] = temp;
            }

            const assignment = new Assignment({
                groupId,
                giverId: members[i]._id,
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

// Get assignment for a member (reveal page)
router.get("/reveal/:uniqueId", async (req: Request, res: Response) => {
    try {
        const { uniqueId } = req.params;

        // Find the member
        const member = await Member.findOne({ uniqueId })
            .populate("groupId", "name description exchangeDate budget");

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        // Find the assignment
        const assignment = await Assignment.findOne({
            groupId: member.groupId._id,
            giverId: member._id,
        }).populate("receiverId", "name giftPreferences");

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found. Assignments may not be generated yet." });
        }

        res.json({
            participant: member,
            recipient: assignment.receiverId,
            group: member.groupId,
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
        const memberCount = await Member.countDocuments({ groupId });

        res.json({
            assignmentsGenerated: assignmentCount > 0,
            assignmentCount,
            participantCount: memberCount,
        });
    } catch (error) {
        console.error("Error checking assignment status:", error);
        res.status(500).json({ message: "Failed to check assignment status" });
    }
});

export default router; 
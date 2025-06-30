import express, { Request, Response } from "express";
import { nanoid } from "nanoid";
import Participant from "../models/Participant";
import Group from "../models/Group";

const router = express.Router();

// Join a group (create participant)
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, giftPreferences, groupCode } = req.body;

        // Find the group by code
        const group = await Group.findOne({ code: groupCode.toUpperCase() });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if participant already exists in this group
        const existingParticipant = await Participant.findOne({
            email: email.toLowerCase(),
            groupId: group._id,
        });

        if (existingParticipant) {
            return res.status(400).json({ message: "Participant already joined this group" });
        }

        // Generate unique ID for the participant
        const uniqueId = nanoid(12);

        const participant = new Participant({
            name,
            email: email.toLowerCase(),
            giftPreferences,
            groupId: group._id,
            uniqueId,
        });

        await participant.save();
        res.status(201).json(participant);
    } catch (error) {
        console.error("Error creating participant:", error);
        res.status(500).json({ message: "Failed to join group" });
    }
});

// Get participants by group ID
router.get("/group/:groupId", async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const participants = await Participant.find({ groupId }).select("-uniqueId");

        res.json(participants);
    } catch (error) {
        console.error("Error fetching participants:", error);
        res.status(500).json({ message: "Failed to fetch participants" });
    }
});

// Get participant by unique ID
router.get("/:uniqueId", async (req: Request, res: Response) => {
    try {
        const { uniqueId } = req.params;
        const participant = await Participant.findOne({ uniqueId })
            .populate("groupId", "name description exchangeDate budget");

        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        res.json(participant);
    } catch (error) {
        console.error("Error fetching participant:", error);
        res.status(500).json({ message: "Failed to fetch participant" });
    }
});

export default router; 
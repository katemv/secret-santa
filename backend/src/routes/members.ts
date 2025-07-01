import express, { Request, Response } from "express";
import { nanoid } from "nanoid";
import Member from "../models/Member";
import Group from "../models/Group";

const router = express.Router();

// Join a group (create member)
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, giftPreferences, groupCode } = req.body;

        // Find the group by code
        const group = await Group.findOne({ code: groupCode.toUpperCase() });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if member already exists in this group
        const existingMember = await Member.findOne({
            email: email.toLowerCase(),
            groupId: group._id,
        });

        if (existingMember) {
            return res.status(400).json({ message: "Member already joined this group" });
        }

        // Generate unique ID for the member
        const uniqueId = nanoid(12);

        const member = new Member({
            name,
            email: email.toLowerCase(),
            giftPreferences,
            groupId: group._id,
            uniqueId,
        });

        await member.save();
        res.status(201).json(member);
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).json({ message: "Failed to join group" });
    }
});

// Get members by group ID
router.get("/group/:groupId", async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const members = await Member.find({ groupId }).select("-uniqueId");

        res.json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: "Failed to fetch members" });
    }
});

// Get member by unique ID
router.get("/:uniqueId", async (req: Request, res: Response) => {
    try {
        const { uniqueId } = req.params;
        const member = await Member.findOne({ uniqueId })
            .populate("groupId", "name description exchangeDate budget");

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.json(member);
    } catch (error) {
        console.error("Error fetching member:", error);
        res.status(500).json({ message: "Failed to fetch member" });
    }
});

export default router; 
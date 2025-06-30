import express, { Request, Response } from "express";
import { nanoid } from "nanoid";
import Group from "../models/Group";

const router = express.Router();

// Create a new group
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, description, exchangeDate, budget } = req.body;

        // Generate unique group code
        const code = nanoid(8).toUpperCase();

        const group = new Group({
            name,
            description,
            exchangeDate: new Date(exchangeDate),
            budget,
            code,
        });

        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error("Error creating group:", error);
        res.status(500).json({ message: "Failed to create group" });
    }
});

// Get group by code
router.get("/code/:code", async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const group = await Group.findOne({ code: code.toUpperCase() });

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.json(group);
    } catch (error) {
        console.error("Error fetching group:", error);
        res.status(500).json({ message: "Failed to fetch group" });
    }
});

// Get group by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.json(group);
    } catch (error) {
        console.error("Error fetching group:", error);
        res.status(500).json({ message: "Failed to fetch group" });
    }
});

export default router; 
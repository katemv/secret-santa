import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { nanoid } from "nanoid";
import Group from "../models/Group";
import Member from "../models/Member";

const router = express.Router();

const createGroupValidation = [
    body("name")
        .notEmpty()
        .withMessage("Group name is required")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Group name must be between 1 and 100 characters"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .trim(),
    
    body("exchangeDate")
        .isISO8601()
        .withMessage("Exchange date must be a valid date"),
    
    body("budget")
        .isFloat({ min: 0 })
        .withMessage("Budget must be a positive number"),
    
    body("ownerName")
        .notEmpty()
        .withMessage("Owner name is required")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage("Owner name must be between 1 and 50 characters"),
    
    body("ownerEmail")
        .optional()
        .isEmail()
        .withMessage("Owner email must be valid"),
    
    body("members")
        .isArray({ min: 2 })
        .withMessage("Members array is required and must contain at least 2 members")
        .custom((members, { req }) => {
            const filledMembers = members.filter((name: string) => name && name.trim().length > 0);
            
            if (filledMembers.length < 2) {
                throw new Error("At least 2 members are required");
            }

            const ownerName = req.body.ownerName;
            const allNames = [ownerName, ...filledMembers]
                .map((name: string) => name.trim().toLowerCase())
                .filter((name: string) => name.length > 0);
            
            const uniqueNames = [...new Set(allNames)];
            if (uniqueNames.length !== allNames.length) {
                throw new Error("All member names must be unique");
            }
            
            return true;
        }),
    
    body("members.*")
        .optional()
        .isString()
        .withMessage("Each member name must be a string")
        .isLength({ max: 50 })
        .withMessage("Member names cannot exceed 50 characters")
];

router.post("/", createGroupValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: errors.array() 
            });
        }

        const { name, description, exchangeDate, budget, ownerName, ownerEmail, members } = req.body;

        const code = nanoid(8).toUpperCase();

        const group = new Group({
            name,
            description,
            exchangeDate: new Date(exchangeDate),
            budget,
            code,
        });

        await group.save();

        // Create owner member
        const ownerMember = new Member({
            name: ownerName.trim(),
            email: ownerEmail || "temp@example.com",
            giftPreferences: "Gift preferences not set yet",
            groupId: group._id,
            uniqueId: nanoid(12),
        });
        await ownerMember.save();

        // Create other members
        for (const memberName of members) {
            const member = new Member({
                name: memberName.trim(),
                email: `${memberName.trim().toLowerCase().replace(/\s+/g, ".")}@temp.com`,
                giftPreferences: "Gift preferences not set yet",
                groupId: group._id,
                uniqueId: nanoid(12),
            });
            await member.save();
        }

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
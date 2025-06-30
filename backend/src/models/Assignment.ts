import mongoose, { Document, Schema } from "mongoose";

export interface IAssignment extends Document {
  groupId: mongoose.Types.ObjectId
  giverId: mongoose.Types.ObjectId
  receiverId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const AssignmentSchema = new Schema<IAssignment>({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    giverId: {
        type: Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
}, {
    timestamps: true,
});

// Ensure each participant can only give to one person per group
AssignmentSchema.index({ groupId: 1, giverId: 1 }, { unique: true });

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema); 
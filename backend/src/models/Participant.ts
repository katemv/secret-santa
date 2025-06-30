import mongoose, { Document, Schema } from "mongoose";

export interface IParticipant extends Document {
  name: string
  email: string
  giftPreferences: string
  groupId: mongoose.Types.ObjectId
  uniqueId: string
  createdAt: Date
  updatedAt: Date
}

const ParticipantSchema = new Schema<IParticipant>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    giftPreferences: {
        type: String,
        required: true,
        trim: true,
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IParticipant>("Participant", ParticipantSchema); 
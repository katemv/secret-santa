import mongoose, { Document, Schema } from "mongoose";

export interface IGroup extends Document {
  name: string
  description: string
  exchangeDate: Date
  budget: number
  code: string
  createdAt: Date
  updatedAt: Date
}

const GroupSchema = new Schema<IGroup>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    exchangeDate: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
        min: 0,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IGroup>("Group", GroupSchema); 
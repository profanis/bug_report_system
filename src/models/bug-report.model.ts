import { Document, Model, model, Schema } from "mongoose";

export interface IBugReport  {
    id: string;
    title: string;
    description: string;
    priority: number;
    reporter?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

let bugReportSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        priority: { type: Number, required: true },        
        reporter: String,
        status: String
    },
    {
        timestamps: true
    }
);
export const BugReportModel = model<IBugReport  & Document>("Bugs", bugReportSchema);

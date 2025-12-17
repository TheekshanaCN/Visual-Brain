import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreditPlan extends Document {
    planId: string;
    priceId: string;
    credits: number;
}

const CreditPlanSchema: Schema = new Schema(
    {
        planId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        priceId: {
            type: String,
            required: true
        },
        credits: {
            type: Number,
            required: true,
            min: 0
        },
    },
    {
        collection: 'credit_plans',
        timestamps: true
    }
);

const CreditPlan: Model<ICreditPlan> = mongoose.models.CreditPlan || mongoose.model<ICreditPlan>('CreditPlan', CreditPlanSchema);

export default CreditPlan;

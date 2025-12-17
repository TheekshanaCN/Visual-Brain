import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPricingPlan {
    name: string;
    planId: string;
    credits: number;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
}

export interface IAdminPricingSettings extends Document {
    plans: IPricingPlan[];
}

const PricingPlanSchema = new Schema<IPricingPlan>(
    {
        name: { type: String, required: true },
        planId: { type: String, required: true },
        credits: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        features: {
            type: [String],
            required: true,
        },
        popular: { type: Boolean, default: false },
    },
    { _id: false }
);

const AdminPricingSettingsSchema = new Schema<IAdminPricingSettings>(
    {
        plans: {
            type: [PricingPlanSchema],
            required: true,
            validate: {
                validator: (plans: IPricingPlan[]) =>
                    plans.length > 0 &&
                    new Set(plans.map(p => p.planId)).size === plans.length,
                message: 'Plans must be unique and non-empty',
            },
        },
    },
    {
        collection: 'admin_pricing',
        timestamps: true,
    }
);

const AdminPricingSettings =
    mongoose.models.AdminPricingSettings ||
    mongoose.model<IAdminPricingSettings>(
        'AdminPricingSettings',
        AdminPricingSettingsSchema
    );

export default AdminPricingSettings;

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPricingPlan {
    name: string;
    credits: number;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
}

export interface IAdminPricingSettings extends Document {
    plans: IPricingPlan[];
}

const AdminPricingSettingsSchema: Schema = new Schema(
    {
        plans: [
            {
                name: { type: String, required: true },
                credits: { type: Number, required: true },
                price: { type: Number, required: true },
                description: { type: String, required: true },
                features: [{ type: String }],
                popular: { type: Boolean, default: false },
            },
        ],
    },
    { collection: 'admin_pricing' }
);

const AdminPricingSettings: Model<IAdminPricingSettings> = mongoose.models.AdminPricingSettings || mongoose.model<IAdminPricingSettings>('AdminPricingSettings', AdminPricingSettingsSchema);

export default AdminPricingSettings;

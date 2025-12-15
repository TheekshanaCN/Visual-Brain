import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminCreditSettings extends Document {
    defaultUserCredits: number;
    mapGenerationCost: number;
    cardGenerationCost: number;
}

const AdminCreditSettingsSchema: Schema = new Schema(
    {
        defaultUserCredits: { type: Number, default: 500 },
        mapGenerationCost: { type: Number, default: 10 },
        cardGenerationCost: { type: Number, default: 5 },
    },
    { collection: 'admin_credits' }
);

const AdminCreditSettings: Model<IAdminCreditSettings> = mongoose.models.AdminCreditSettings || mongoose.model<IAdminCreditSettings>('AdminCreditSettings', AdminCreditSettingsSchema);

export default AdminCreditSettings;

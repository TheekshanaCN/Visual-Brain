import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminCreditSettings extends Document {
    defaultUserCredits: number;
    mapGenerationCost: number;
    cardGenerationCost: number;
}

const AdminCreditSettingsSchema = new Schema<IAdminCreditSettings>(
    {
        defaultUserCredits: {
            type: Number,
            required: true,
        },
        mapGenerationCost: {
            type: Number,
            required: true,
        },
        cardGenerationCost: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'admin_credits',
        timestamps: true,
    }
);

const AdminCreditSettings =
    mongoose.models.AdminCreditSettings ||
    mongoose.model<IAdminCreditSettings>(
        'AdminCreditSettings',
        AdminCreditSettingsSchema
    );

export default AdminCreditSettings;

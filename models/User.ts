import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    workosId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string;
    credits: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        workosId: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        profilePictureUrl: { type: String },
        credits: { type: Number, default: 500 },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

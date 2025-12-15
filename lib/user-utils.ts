import dbConnect from './db';
import User, { IUser } from '@/models/User';

export async function syncUser(workosUser: any): Promise<IUser | null> {
    await dbConnect();

    if (!workosUser) return null;

    const existingUser = await User.findOne({ workosId: workosUser.id });

    if (existingUser) {
        // Update user usage or details if needed
        // For now we just return it
        return existingUser;
    }

    // Fetch default credits from admin settings
    const { getAdminCreditSettings } = await import('./admin-config');
    const settings = await getAdminCreditSettings();

    // Create new user with dynamic default credits
    const newUser = await User.create({
        workosId: workosUser.id,
        email: workosUser.email,
        firstName: workosUser.firstName,
        lastName: workosUser.lastName,
        profilePictureUrl: workosUser.profilePictureUrl,
        credits: settings.defaultUserCredits,
    });

    return newUser;
}

export async function getUserCredits(workosId: string): Promise<number> {
    await dbConnect();
    const user = await User.findOne({ workosId });
    return user ? user.credits : 0;
}

export async function deductCredits(workosId: string, amount: number): Promise<boolean> {
    await dbConnect();
    const user = await User.findOne({ workosId });

    if (!user || user.credits < amount) {
        return false;
    }

    user.credits -= amount;
    await user.save();
    return true;
}

export async function addCredits(workosId: string, amount: number): Promise<boolean> {
    await dbConnect();
    const user = await User.findOne({ workosId });

    if (!user) return false;

    user.credits += amount;
    await user.save();
    return true;
}

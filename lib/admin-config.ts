// lib/admin-config.ts
import dbConnect from './db';
import AdminCreditSettings from '@/models/AdminCreditSettings';
import AdminPricingSettings from '@/models/AdminPricingSettings';

export async function getAdminCreditSettings() {
    await dbConnect();
    return AdminCreditSettings.findOne({});
}

export async function getAdminPricingSettings() {
    await dbConnect();
    return AdminPricingSettings.findOne({});
}

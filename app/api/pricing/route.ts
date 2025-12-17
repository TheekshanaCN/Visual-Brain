import { NextResponse } from 'next/server';
import { getAdminPricingSettings } from '@/lib/admin-config';

export async function GET() {
    try {
        const settings = await getAdminPricingSettings();
        // Serialize to ensure plain object
        return NextResponse.json(JSON.parse(JSON.stringify(settings.plans)));
    } catch (error) {
        console.error('Failed to fetch pricing plans:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

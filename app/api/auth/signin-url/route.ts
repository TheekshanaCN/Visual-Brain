import { NextResponse } from 'next/server';
import { getSignInUrl } from '@workos-inc/authkit-nextjs';

export async function GET() {
    try {
        const url = await getSignInUrl();
        return NextResponse.json({ url });
    } catch (error) {
        console.error('Error getting sign-in URL:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

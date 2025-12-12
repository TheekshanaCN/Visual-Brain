import { NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { user } = await withAuth();
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userId = user.id;

        const body = await req.json();
        const { category, feedback, projectId } = body;

        if (!category || !feedback) {
            return NextResponse.json({ error: 'Category and feedback are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('visual-brain');
        
        const feedbackDoc = {
            userId,
            category,
            feedback,
            projectId: projectId || null,
            createdAt: new Date(),
            status: 'new' // Can be: new, reviewed, resolved
        };

        const result = await db.collection('feedbacks').insertOne(feedbackDoc);

        return NextResponse.json({ 
            success: true, 
            feedbackId: result.insertedId 
        });
    } catch (error) {
        console.error('Failed to save feedback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

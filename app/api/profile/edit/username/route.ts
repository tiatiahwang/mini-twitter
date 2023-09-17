import { getAuthSession } from '@/libs/auth';
import { db } from '@/libs/db';
import { EditProfileValidator } from '@/libs/validator/profile';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized.', { status: 401 });
    }

    const body = await req.json();
    const { username } = EditProfileValidator.parse(body);

    const user = await db.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response('Something went wrong.', {
        status: 500,
      });
    }

    if (username === user.username) {
      return new Response('write new username.', {
        status: 400,
      });
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        username,
      },
    });

    return NextResponse.json({
      message: 'Username updated successfully.',
      success: true,
    });
  } catch (error: any) {
    console.log('[PROFILE_EDIT_USERNAME]', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    );
  }
}

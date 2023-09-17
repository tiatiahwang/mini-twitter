import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/libs/auth';
import { db } from '@/libs/db';
import { EditAvatarValidator } from '@/libs/validator/profile';

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized.', { status: 401 });
    }

    const body = await req.json();
    const { avatar } = EditAvatarValidator.parse(body);

    const user = await db.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response('Something went wrong.', {
        status: 500,
      });
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        avatar,
      },
    });

    return NextResponse.json({
      message: 'Avatar updated successfully.',
      success: true,
    });
  } catch (error: any) {
    console.log('[PROFILE_EDIT_AVATAR]', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    );
  }
}

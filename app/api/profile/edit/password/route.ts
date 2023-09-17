import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/libs/auth';
import { db } from '@/libs/db';
import { EditPasswordValidator } from '@/libs/validator/profile';

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized.', { status: 401 });
    }

    const body = await req.json();
    const { password, newPassword } =
      EditPasswordValidator.parse(body);

    const user = await db.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      return new Response('Something went wrong.', {
        status: 500,
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      user.password,
    );

    if (!checkPassword) {
      return new Response('Check current password.', {
        status: 401,
      });
    }

    const isSame = await bcrypt.compare(
      newPassword,
      user.password,
    );

    console.log(isSame);

    if (isSame) {
      return new Response('Type new password.', {
        status: 400,
      });
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });

    return NextResponse.json({
      message: 'Password updated successfully.',
      success: true,
    });
  } catch (error: any) {
    console.log('[PROFILE_EDIT_PASSWORD]', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    );
  }
}

import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/db';
import { JoinValidator } from '@/libs/validator/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, username } =
      JoinValidator.parse(body);

    const checkEmail = await db.user.findUnique({
      where: { email },
    });

    const checkUsername = await db.user.findUnique({
      where: { username },
    });

    if (checkEmail && checkUsername) {
      return new Response(
        'Email and Username already exist.',
        { status: 400 },
      );
    }

    if (checkEmail) {
      return new Response('Email already exists.', {
        status: 400,
      });
    }

    if (checkUsername) {
      return new Response('Username already exists.', {
        status: 400,
      });
    }

    await db.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        username,
      },
    });

    return NextResponse.json({
      message: 'User created successfully.',
      success: true,
    });
  } catch (error: any) {
    console.log('[JOIN_ERROR]', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    );
  }
}

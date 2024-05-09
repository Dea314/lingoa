import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/admin";
import { challenges } from "@/db/schema";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, params.challengeId),
  });
  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = (await req.json()) as typeof challenges.$inferSelect;
  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, params.challengeId))
    .returning();
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { challengeId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, params.challengeId))
    .returning();
  return NextResponse.json(data[0]);
};

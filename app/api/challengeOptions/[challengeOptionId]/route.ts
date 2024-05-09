import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { challengeOptionId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, params.challengeOptionId),
  });
  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { challengeOptionId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = (await req.json()) as typeof challengeOptions.$inferSelect;
  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, params.challengeOptionId))
    .returning();
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { challengeOptionId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, params.challengeOptionId))
    .returning();
  return NextResponse.json(data[0]);
};

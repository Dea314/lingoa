import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
//@ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding DB");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 2,
        title: "German",
        imageSrc: "/de.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 5,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 6,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
    ]);

    console.log("Seeding finished!");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed DB");
  }
};

main();

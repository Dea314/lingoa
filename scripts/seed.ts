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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

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

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Italian",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Numbers",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Colours",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Food",
      },
      {
        id: 6,
        unitId: 1,
        order: 6,
        title: "Verbs",
      },
      {
        id: 7,
        unitId: 1,
        order: 7,
        title: "Verbs",
      },
      {
        id: 8,
        unitId: 1,
        order: 8,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        qusetion: `Which one of these is the "mother"?`,
      },
      {
        id: 2,
        lessonId: 1, // Verbs
        type: "ASSIST",
        order: 2,
        qusetion: `"to talk"`,
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        qusetion: `Which one of these is the "brother"?`,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/mother.svg",
        correct: true,
        text: "madre",
        audioSrc: "/it_madre.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/brother.svg",
        correct: false,
        text: "fratello",
        audioSrc: "/it_fratello.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/daughter.svg",
        correct: false,
        text: "figlia",
        audioSrc: "/it_figlia.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: false,
        text: "camminare",
        audioSrc: "/it_camminare.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "pagare",
        audioSrc: "/it_pagare.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "parlare",
        audioSrc: "/it_parlare.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/mother.svg",
        correct: false,
        text: "madre",
        audioSrc: "/it_madre.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/brother.svg",
        correct: true,
        text: "fratello",
        audioSrc: "/it_fratello.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/daughter.svg",
        correct: false,
        text: "figlia",
        audioSrc: "/it_figlia.mp3",
      },
    ]);

    console.log("Seeding finished!");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed DB");
  }
};

main();

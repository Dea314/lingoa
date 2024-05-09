import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding DB");

    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { id: 1, title: "Italian", imageSrc: "/it.svg" },
        { id: 2, title: "Spanish", imageSrc: "/es.svg" },
        { id: 3, title: "German", imageSrc: "/de.svg" },
        { id: 4, title: "French", imageSrc: "/fr.svg" },
        { id: 5, title: "Croatian", imageSrc: "/hr.svg" },
        { id: 6, title: "Japanese", imageSrc: "/jp.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title} 1`,
            order: 2,
          },
          {
            courseId: course.id,
            title: "Unit 3",
            description: `Learn intermediate ${course.title} 2`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                qusetion: `Which one of these is the "mother"?`,
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                qusetion: `"the house"`,
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                qusetion: `Which one of these is the "brother"?`,
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                qusetion: `"an apple"`,
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                qusetion: `Which one of these is the "mother"?`,
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                qusetion: `"the house"`,
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                qusetion: `Which one of these is the "brother"?`,
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                qusetion: `"the house"`,
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            // let challengeOptions: { [key: string]: any }[] = [];

            if (challenge.order === 1) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/it_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "fratello",
                    imageSrc: "/brother.svg",
                    audioSrc: "/it_fratello.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "figlia",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/it_figlia.mp3",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/es_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hermano",
                    imageSrc: "/brother.svg",
                    audioSrc: "/es_hermano.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hija",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/es_hija.mp3",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Mutter",
                    imageSrc: "/mother.svg",
                    audioSrc: "/de_mutter.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Bruder",
                    imageSrc: "/brother.svg",
                    audioSrc: "/de_bruder.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Tochter",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/de_tochter.mp3",
                  },
                ]);
              }
            }
            if (challenge.order === 2) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "il ristorante",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la scuola",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la casa",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el restaurante",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la escuela",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la casa",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Restaurant",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Schule",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Haus",
                  },
                ]);
              }
            }
            if (challenge.order === 3) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/it_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "fratello",
                    imageSrc: "/brother.svg",
                    audioSrc: "/it_fratello.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "figlia",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/it_figlia.mp3",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/es_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "hermano",
                    imageSrc: "/brother.svg",
                    audioSrc: "/es_hermano.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hija",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/es_hija.mp3",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Mutter",
                    imageSrc: "/mother.svg",
                    audioSrc: "/de_mutter.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Bruder",
                    imageSrc: "/brother.svg",
                    audioSrc: "/de_bruder.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Tochter",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/de_tochter.mp3",
                  },
                ]);
              }
            }
            if (challenge.order === 4) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la pera",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "una mela",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "una banana",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la pera",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "una manzana",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "una banana",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "eine Birne",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "der Apfel",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "eine Banane",
                  },
                ]);
              }
            }
            if (challenge.order === 5) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/it_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "fratello",
                    imageSrc: "/brother.svg",
                    audioSrc: "/it_fratello.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "figlia",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/it_figlia.mp3",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/es_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hermano",
                    imageSrc: "/brother.svg",
                    audioSrc: "/es_hermano.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hija",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/es_hija.mp3",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Mutter",
                    imageSrc: "/mother.svg",
                    audioSrc: "/de_mutter.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Bruder",
                    imageSrc: "/brother.svg",
                    audioSrc: "/de_bruder.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Tochter",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/de_tochter.mp3",
                  },
                ]);
              }
            }
            if (challenge.order === 6) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "il ristorante",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la scuola",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la casa",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el restaurante",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la escuela",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la casa",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Restaurant",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Schule",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Haus",
                  },
                ]);
              }
            }
            if (challenge.order === 7) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/it_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "fratello",
                    imageSrc: "/brother.svg",
                    audioSrc: "/it_fratello.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "figlia",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/it_figlia.mp3",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "madre",
                    imageSrc: "/mother.svg",
                    audioSrc: "/es_madre.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "hermano",
                    imageSrc: "/brother.svg",
                    audioSrc: "/es_hermano.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "hija",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/es_hija.mp3",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Mutter",
                    imageSrc: "/mother.svg",
                    audioSrc: "/de_mutter.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "Bruder",
                    imageSrc: "/brother.svg",
                    audioSrc: "/de_bruder.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "Tochter",
                    imageSrc: "/daughter.svg",
                    audioSrc: "/de_tochter.mp3",
                  },
                ]);
              }
            }
            if (challenge.order === 8) {
              if (course.title === "Italian") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la pera",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "una mela",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "una banana",
                  },
                ]);
              } else if (course.title === "Spanish") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la pera",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "una manzana",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "una banana",
                  },
                ]);
              } else if (course.title === "German") {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "eine Birne",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "der Apfel",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "eine Banane",
                  },
                ]);
              }
            }
          }
        }
      }
    }

    /* 
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 2,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "German",
        imageSrc: "/de.svg",
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
      {
        id: 2,
        courseId: 1,
        title: "Unit 2",
        description: "Learn intermediate Italian 1",
        order: 1,
      },
      {
        id: 3,
        courseId: 1,
        title: "Unit 3",
        description: "Learn intermediate Italian 2",
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
        title: "Adjectives",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Phrases",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Sentences",
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
        title: "Nouns",
      },
      {
        id: 8,
        unitId: 1,
        order: 8,
        title: "Phrases",
      },
      {
        id: 9,
        unitId: 2,
        order: 9,
        title: "Adjectives",
      },
      {
        id: 10,
        unitId: 2,
        order: 10,
        title: "Sentences",
      },
      {
        id: 11,
        unitId: 2,
        order: 11,
        title: "Nouns",
      },
      {
        id: 12,
        unitId: 2,
        order: 12,
        title: "Verbs",
      },
      {
        id: 13,
        unitId: 2,
        order: 13,
        title: "Adjectives",
      },
      {
        id: 14,
        unitId: 2,
        order: 14,
        title: "Sentences",
      },
      {
        id: 15,
        unitId: 2,
        order: 15,
        title: "Verbs",
      },
      {
        id: 16,
        unitId: 2,
        order: 16,
        title: "Nouns",
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
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        qusetion: `"the house"`,
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        qusetion: `Which one of these is the "brother"?`,
      },
      {
        id: 4,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 4,
        qusetion: `"an apple"`,
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
        text: "il ristorante",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la scuola",
      },
      {
        challengeId: 2,
        correct: true,
        text: "la casa",
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

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        correct: false,
        text: "la pera",
      },
      {
        challengeId: 4,
        correct: true,
        text: "una mela",
      },
      {
        challengeId: 4,
        correct: false,
        text: "una banana",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        qusetion: `Which one of these is the "mother"?`,
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 2,
        qusetion: `"to talk"`,
      },
      {
        id: 7,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 3,
        qusetion: `Which one of these is the "brother"?`,
      },
      {
        id: 8,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 4,
        qusetion: `"red"`,
      },
    ]); */

    console.log("Seeding finished!");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed DB");
  }
};

main();

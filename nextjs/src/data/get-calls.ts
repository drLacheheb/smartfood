import type { Call } from "@/types";
import { faker } from "@faker-js/faker";

export async function getData(): Promise<Call[]> {
  const statuses = [
    "completed",
    "transcribing",
    "processing",
    "active",
    "uploading",
  ];

  const calls = Array.from({ length: 100 }).map(() => {
    const status = faker.helpers.arrayElement(statuses);
    const createdAt = faker.date.recent({ days: 10 }); // Random date within the last 10 days
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    return {
      id: faker.number.bigInt().toString(),
      status: status,
      audioFile: `/uploads/file.mp3`,
      transcript:
        status !== "transcribing" ? faker.lorem.sentence() : undefined,
      aiResponse: status === "completed" ? faker.lorem.sentence() : undefined,
      customerId: faker.helpers.replaceSymbols("cust-###"),
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  });

  return calls as Call[];
}

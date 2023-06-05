import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.body;

  try {
    await prisma.notes.create({
      data: {
        title,
      },
    });
    res.status(200).json({ message: "Tạo thành công!" });
  } catch (error) {
    console.log("Failed");
  }
}

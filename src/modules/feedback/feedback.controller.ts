import type { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../utils/prisma.js";
import type { UserTokenPayload } from "../user/user.schema.js";
import type { RouteGenericInterface } from "fastify";

interface SubmitFeedbackBody {
  rating: number;
  feedback: string;
  preference: "HIGHERS" | "PLACEMENT" | "BOTH";
}

interface FeedbackSubmit extends RouteGenericInterface {
  Body: SubmitFeedbackBody;
}

export async function submitFeedbackHandler(
  request: FastifyRequest<FeedbackSubmit>,
  reply: FastifyReply,
) {
  try {
    const user = await request.jwtVerify<UserTokenPayload>();
    const { rating, feedback: feedbackText, preference } = request.body;

    // ✅ Validation
    if (rating < 1 || rating > 5) {
      return reply
        .status(400)
        .send({ message: "Rating must be between 1 and 5" });
    }

    if (!feedbackText || feedbackText.trim().length < 10) {
      return reply
        .status(400)
        .send({ message: "Feedback must be at least 10 characters" });
    }

    if (!["HIGHERS", "PLACEMENT", "BOTH"].includes(preference)) {
      return reply.status(400).send({ message: "Invalid preference" });
    }

    // ✅ Fetch user (Prisma style)
    const userRecord = await prisma.user.findUnique({
      where: { id: user.id },
      select: { regNo: true },
    });

    if (!userRecord?.regNo) {
      return reply
        .status(400)
        .send({ message: "Registration number not found" });
    }

    // ✅ Insert feedback
    const newFeedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        regNo: userRecord.regNo,
        rating,
        feedback: feedbackText.trim(),
        preference,
      },
      select: { id: true },
    });

    return reply.status(201).send({
      success: true,
      message: "Feedback submitted successfully",
      id: newFeedback.id,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return reply.status(500).send({ message: "Failed to submit feedback" });
  }
}

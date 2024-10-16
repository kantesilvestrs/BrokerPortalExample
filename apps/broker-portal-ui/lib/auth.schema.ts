import { z } from "zod";

export const authenticateResponseSchema = z.object({
  success: z.boolean(),
  token: z.string()
})
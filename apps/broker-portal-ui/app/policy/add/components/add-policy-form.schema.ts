"use client";

import { z } from 'zod'

export const formSchema = z.object({
  ixr: z.string().optional(),
  policyName: z
    .string({ required_error: "Policy name is required" })
    .min(1, { message: "Policy name cannot be empty"}),
  insurableLimit: z.number().optional(),
  lines: z.array(
    z.object({
      id: z.string(),
      value: z
        .string({ required_error: 'Info line is required' })
        .min(1, { message: 'Info line cannot be empty'})
    })
  )
})
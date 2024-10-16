"use server";

import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const policySubmissionSchema = z.object({
  ixr: z.string().nullable(),
  policyName: z.string().nullable(),
  insurableLimit: z.number(),
  lines: z.array(z.string()).nullable()
})

export async function submitPolicy(payload: z.infer<typeof policySubmissionSchema>): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) redirect('/logout');

  try {
    const { data, error } = policySubmissionSchema.safeParse(payload);

    if (error) throw error;

    const requestPayload = JSON.stringify(data);

    console.log(requestPayload)

    console.log('token', token)

    const response = await fetch(`http://localhost:7000/submission?token=${token.value}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Cookie: cookieStore.toString()
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      console.log(response.statusText)
      const errorResponse = await response.json();
      throw errorResponse;
    }

    return true;
  } catch (errors) {
    console.log(errors)
    return false;
  }
}
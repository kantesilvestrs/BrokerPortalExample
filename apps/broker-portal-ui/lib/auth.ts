"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { authenticateResponseSchema } from "./auth.schema";
import { revalidatePath } from "next/cache";

export async function checkAuthentication(): Promise<void> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) redirect('/login');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return Boolean(token);
}

export async function logout(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete("token");
  return redirect('/login', RedirectType.push)
}

export async function authenticate({ username, password }: { username: string; password: string; }) {
  try {
    const response = await fetch('http://localhost:7000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })

    if (!response.ok) {
      console.log(response.statusText)
      const errorResponse = await response.json();
      throw errorResponse;
    }

    const authenticationResponse = await response.json();

    const { data, error } = authenticateResponseSchema.safeParse(authenticationResponse);

    if (error) {
      throw error;
    }

    console.log(data)
    const cookieStore = cookies();
    cookieStore.set('token', data.token, {
      secure: true,
      expires: Date.now() + (1000 * 60 * 30)
    })

  } catch (errors) {
    console.log(errors)
    return false;
  }

  redirect('/', RedirectType.push)
}

export async function revalidateMasthead(): Promise<void> {
  revalidatePath('/', 'layout')
}
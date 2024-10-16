"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { authenticate } from "@/lib/auth";
import { LoginButton } from "./login-button";

export function LoginForm() {
  const [loginError, setLoginError] = useState(false);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    const form = new FormData(e.currentTarget);

    const success = await authenticate({
      username: form.get("username")?.toString() || "",
      password: form.get("password")?.toString() || "",
    });

    if (!success) {
      setLoginError(success);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Card className="w-[350px]">
        <CardHeader className="flex items-center">
          <Avatar>
            <AvatarFallback>
              <PersonIcon />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                tabIndex={0}
                autoFocus
                id="username"
                name="username"
                placeholder="Username"
                className="text-center"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                tabIndex={1}
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                className="text-center"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="" className="underline" tabIndex={3}>
            Forgot password...
          </Link>
          <LoginButton />
        </CardFooter>
      </Card>
    </form>
  );
}

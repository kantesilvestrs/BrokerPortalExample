import { Button } from "@/components/ui/button";
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

export function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex items-center">
        <Avatar>
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                tabIndex={0}
                autoFocus
                id="username"
                placeholder="Username"
                className="text-center"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                tabIndex={1}
                id="password"
                placeholder="Password"
                type="password"
                className="text-center"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="" className="underline" tabIndex={3}>
          Forgot password...
        </Link>
        <Button tabIndex={2}>Log In</Button>
      </CardFooter>
    </Card>
  );
}

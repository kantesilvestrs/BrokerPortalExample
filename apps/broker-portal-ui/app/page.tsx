import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkAuthentication } from "@/lib/auth";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  await checkAuthentication();

  return (
    <div className="w-full h-full flex flex-column justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Please use above <pre className="inline">Broker Actions</pre> to
            start your journey
          </CardTitle>
          <CardDescription>
            Below are some commonly used links by other brokers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/policy/add"
            className="underline flex flex-row items-center gap-2"
          >
            <ChevronRightIcon />
            Submit Policy
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

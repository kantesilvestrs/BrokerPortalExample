import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SiteNavigationMenu } from "./site-navigation-menu";

export function Masthead({
  authenticated,
}: {
  authenticated: boolean;
}): JSX.Element {
  return (
    <>
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Image
          alt="InsurX - The future of risk"
          src="/INSURX_Logo_Full.png"
          width={195}
          height={29}
        />
        <h2 className="text-lg font-semibold self-center">Broker Portal</h2>
        <div className="min-w-[195px] flex flex-row">
          {authenticated && <SiteNavigationMenu />}
        </div>
      </div>
      <Separator />
    </>
  );
}

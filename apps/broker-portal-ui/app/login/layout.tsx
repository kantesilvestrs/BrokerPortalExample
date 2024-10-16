import type { ReactNode } from "react";

export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="w-full h-full flex column justify-center items-center">
      {children}
    </div>
  );
}

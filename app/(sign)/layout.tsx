import { ReactNode } from "react";

export default function SignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid place-items-center h-screen">
      {children}
    </div>
  );
}

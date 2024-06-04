"use client";

import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children, pendingText, variant, size, className }: any) {
  const { pending } = useFormStatus();

  return pending ? (
    <Button aria-disabled={true}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {pendingText}
    </Button> 
    ) : (
      <Button className={buttonVariants({ variant, size, className })} type="submit">
      { children }
      </Button>
    )
}

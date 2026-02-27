"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mr-auto max-w-[85%] md:max-w-[65%]">
      <Avatar className="size-7 shrink-0">
        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-[10px] font-semibold">
          IG
        </AvatarFallback>
      </Avatar>

      <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
          <span className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
          <span className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}

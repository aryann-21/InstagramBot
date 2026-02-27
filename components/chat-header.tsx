"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Phone, Video, Info } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:px-6">
      <button
        className="text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-label="Go back"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="relative">
        <Avatar className="size-9 md:size-10">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
            IG
          </AvatarFallback>
        </Avatar>
        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" />
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-foreground leading-tight truncate">
          Instagram Bot
        </h1>
        <p className="text-xs text-muted-foreground leading-tight">
          Active now
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Audio call"
        >
          <Phone className="size-5" />
        </button>
        <button
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Video call"
        >
          <Video className="size-5" />
        </button>
        <button
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Conversation info"
        >
          <Info className="size-5" />
        </button>
      </div>
    </header>
  )
}

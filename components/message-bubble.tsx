"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

function formatTime(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"
  const h = hours % 12 || 12
  const m = minutes.toString().padStart(2, "0")
  return `${h}:${m} ${ampm}`
}

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user"

  return (
    <div
      className={cn(
        "flex items-end gap-2 max-w-[85%] md:max-w-[65%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {!isUser && (
        <Avatar className="size-7 shrink-0 mb-5">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-[10px] font-semibold">
            IG
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md bg-card text-card-foreground border border-border"
          )}
        >
          {message.text}
        </div>
        <span
          className={cn(
            "text-[10px] text-muted-foreground px-1",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

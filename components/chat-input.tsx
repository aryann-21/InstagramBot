"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { SendHorizonal, ImagePlus, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue("")
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const hasText = value.trim().length > 0

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border bg-card px-3 py-3 md:px-6 md:py-4"
    >
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Add image"
        >
          <ImagePlus className="size-5" />
        </button>

        <div className="relative flex-1">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none rounded-2xl border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "max-h-32 leading-relaxed"
            )}
            style={{ minHeight: "42px" }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Emoji"
          >
            <Smile className="size-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!hasText || disabled}
          className={cn(
            "shrink-0 flex items-center justify-center rounded-full p-2.5 transition-all",
            hasText
              ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
          aria-label="Send message"
        >
          <SendHorizonal className="size-5" />
        </button>
      </div>
    </form>
  )
}

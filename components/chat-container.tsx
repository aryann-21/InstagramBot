"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatInput } from "@/components/chat-input"
import { MessageBubble, type Message } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { ScrollArea } from "@/components/ui/scroll-area"

function isReelUrl(text: string): boolean {
  try {
    const url = new URL(text.trim())
    return (
      url.hostname.includes("instagram.com") &&
      (url.pathname.includes("/reel") || url.pathname.includes("/p/"))
    )
  } catch {
    return text.includes("instagram.com")
  }
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      text: "Hey! Welcome to our Instagram page. How can we help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  async function handleSend(text: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    const isReel = isReelUrl(text)

    // Decide which API to call based on whether this is a reel URL
    // and whether we already have an active conversation.
    let endpoint: string | null = null
    let payload: Record<string, unknown> | null = null

    if (isReel) {
      endpoint = "http://localhost:3000/pipeline"
      payload = {
        reelUrl: text,
        currency: "USD",
      }
    } else if (conversationId) {
      endpoint = "http://localhost:3000/conversation"
      payload = {
        conversationId,
        message: text,
        currency: "USD",
      }
    } else {
      // No conversation has been started yet and this isn't a reel URL.
      // Let the user know they should start by sending a reel link.
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text:
          "Please start by sending an Instagram reel link so I can plan a trip based on it.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch summary from travel planner")
      }

      const data: {
        conversationId?: string
        summary?: string
        history?: string
      } = await response.json()

      if (data.conversationId) {
        setConversationId(data.conversationId)
      }

      const botText =
        (data.summary ?? "").trim() ||
        "I couldn't generate a summary for that reel. Please try another link."

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text:
          "Something went wrong while processing that reel. Please check the link and make sure the travel planner API is running on your machine.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <ChatHeader />

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-4 py-4 md:px-6 md:py-6">
          {/* Bot profile intro */}
          <div className="flex flex-col items-center gap-2 pb-4 pt-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent md:size-20">
              <span className="text-xl font-bold text-primary-foreground md:text-2xl">
                IG
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">
                Instagram Bot
              </p>
              <p className="text-xs text-muted-foreground">
                Typically replies instantly
              </p>
            </div>
          </div>

          {/* Date separator */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Today
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}

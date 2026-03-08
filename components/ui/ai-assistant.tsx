"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Fuse from "fuse.js";
import { aiKnowledge, codeSnippets, type KnowledgeItem } from "@/lib/ai-knowledge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Aliyu's portfolio assistant. Ask me anything about his skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(aiKnowledge, {
        keys: ["question", "keywords", "answer"],
        threshold: 0.4,
        includeScore: true,
      }),
    []
  );

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findResponse = useCallback(
    (query: string): string => {
      // Check for code generation requests
      const codeMatch = query.toLowerCase().match(/(?:generate|create|make|write|give me|show me)\s+(?:a\s+)?(?:html\s+)?(?:code\s+)?(?:for\s+)?(?:a\s+)?(button|card|form|navbar)/);
      if (codeMatch) {
        const element = codeMatch[1];
        if (codeSnippets[element]) {
          return `Here's a simple ${element} code:\n\n\`\`\`html\n${codeSnippets[element]}\n\`\`\`\n\nWould you like me to explain this or modify it?`;
        }
      }

      // Fuzzy search
      const results = fuse.search(query);
      
      if (results.length > 0 && results[0].score !== undefined && results[0].score < 0.5) {
        return results[0].item.answer;
      }

      // Fallback responses
      const fallbacks = [
        "I'm not sure about that specific question. Try asking about Aliyu's skills, projects, or how to contact him!",
        "That's an interesting question! For specific details, you might want to explore the portfolio sections or ask about projects, skills, or contact information.",
        "I don't have that information readily available. Feel free to ask about Aliyu's work, experience, or how to get in touch!",
      ];
      
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },
    [fuse]
  );

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = findResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 1000);
  }, [input, findResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 h-14 w-14 rounded-full shadow-lg transition-all",
          isOpen
            ? "bg-fuchsia-500 hover:bg-fuchsia-600"
            : "bg-cyan-500 hover:bg-cyan-600"
        )}
        style={{
          boxShadow: isOpen
            ? "0 0 20px rgba(255, 0, 255, 0.4)"
            : "0 0 20px rgba(0, 240, 255, 0.4)",
        }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 left-4 md:bottom-24 md:left-8 z-50",
            "w-[calc(100vw-2rem)] max-w-sm md:w-96",
            "rounded-2xl overflow-hidden",
            "bg-background/95 backdrop-blur-md border border-cyan-500/20",
            "shadow-2xl",
            "animate-in slide-in-from-bottom-4 fade-in duration-300"
          )}
          style={{
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.15)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-cyan-500/5">
            <div className="relative">
              <Bot className="h-8 w-8 text-cyan-400" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-background" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Portfolio Assistant</h3>
              <p className="text-xs text-muted-foreground">Online • Powered by Fuse.js</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="h-72 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center",
                      message.role === "assistant"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-fuchsia-500/20 text-fuchsia-400"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                      message.role === "assistant"
                        ? "bg-muted text-foreground"
                        : "bg-cyan-500/20 text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted/50 border-border/50 focus-visible:ring-cyan-400"
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!input.trim() || isTyping}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

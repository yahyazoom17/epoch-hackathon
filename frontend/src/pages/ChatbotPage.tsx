import { useState, useRef, useEffect } from "react";
import {
  Flower2,
  BrainCircuit,
  HeartPulse,
  History,
  Send,
  Leaf,
  Bot,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

/* ─── Design Tokens from DESIGN.md ─── */
const colors = {
  primary: "#1B3A2E",
  secondary: "#7A8F85",
  tertiary: "#4E8B6A",
  neutral: "#F4F7F4",
  surface: "#FFFFFF",
  onPrimary: "#FFFFFF",
};

/* ─── Types ─── */
interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
}

/* ─── Nav Items ─── */
const navItems = [
  { label: "Health Sanctuary", icon: Flower2, href: "/sanctuary" },
  { label: "Wellness Guide", icon: BrainCircuit, href: "/chatbot", active: true },
  { label: "Vitals Log", icon: HeartPulse, href: "/vitals" },
  { label: "Health History", icon: History, href: "/history" },
];

/* ─── Seed Messages ─── */
const seedMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Good morning. I am your Clinical Wellness Guide. How are you feeling today? I am here to discuss your current symptoms, review your recent vitals, or simply provide a calm space for health reflections.",
  },
  {
    id: "2",
    role: "user",
    content:
      "I've been experiencing mild headaches in the late afternoon for the past two days. Could it be related to my new medication schedule?",
  },
  {
    id: "3",
    role: "ai",
    content:
      "Thank you for sharing that observation. Mild afternoon headaches can sometimes occur as your body adjusts to a new medication schedule.",
  },
  {
    id: "4",
    role: "ai",
    content:
      "Let's review your recent logs. I note your hydration levels were slightly below target yesterday. Before we consider the medication as the primary cause, I recommend drinking a glass of water and resting for 15 minutes in a quiet environment.",
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      id="chatbot-page"
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        fontFamily: "'DM Sans', sans-serif",
        background: colors.neutral,
        color: colors.primary,
      }}
    >
      {/* ────────── Sidebar ────────── */}
      <aside
        id="sidebar"
        style={{
          width: 260,
          minWidth: 260,
          display: "flex",
          flexDirection: "column",
          background: colors.surface,
          borderRight: `1px solid ${colors.secondary}33`,
          padding: "32px 0 24px",
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            padding: "0 24px",
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Leaf size={20} color={colors.onPrimary} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  margin: 0,
                  color: colors.primary,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Nidana
              </h1>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  color: colors.secondary,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Clinical Calm AI
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;
            return (
              <a
                key={item.label}
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? colors.primary : colors.secondary,
                  background: isActive ? `${colors.tertiary}14` : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = `${colors.neutral}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <Icon
                  size={18}
                  color={isActive ? colors.tertiary : colors.secondary}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom Brand */}
        <div style={{ padding: "0 24px" }}>
          <Separator
            style={{ background: `${colors.secondary}20`, marginBottom: 16 }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              color: colors.secondary,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Clinic Sage v1.0
          </span>
        </div>
      </aside>

      {/* ────────── Main Content ────────── */}
      <main
        id="main-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <header
          id="chat-header"
          style={{
            padding: "28px 40px 20px",
            background: colors.surface,
            borderBottom: `1px solid ${colors.secondary}20`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: colors.tertiary,
              }}
            />
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 500,
                margin: 0,
                color: colors.primary,
                lineHeight: 1.25,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Wellness Guide
            </h2>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: colors.secondary,
              lineHeight: 1.65,
              marginLeft: 20,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Your clinical AI assistant. Ask questions and receive calm, measured
            guidance.
          </p>
        </header>

        {/* Chat Area */}
        <ScrollArea
          className="flex-1"
          style={{ background: colors.neutral }}
        >
          <div
            ref={scrollRef}
            id="messages-container"
            style={{
              padding: "32px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minHeight: "100%",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {/* AI Avatar */}
                {msg.role === "ai" && (
                  <Avatar
                    size="default"
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <AvatarFallback
                      style={{
                        background: colors.primary,
                        color: colors.onPrimary,
                      }}
                    >
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Message Bubble */}
                <div
                  style={{
                    maxWidth: "65%",
                    padding: "14px 20px",
                    borderRadius:
                      msg.role === "ai"
                        ? "4px 16px 16px 16px"
                        : "16px 4px 16px 16px",
                    background:
                      msg.role === "ai" ? colors.surface : colors.primary,
                    color:
                      msg.role === "ai" ? colors.primary : colors.onPrimary,
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow:
                      msg.role === "ai"
                        ? `0 1px 3px ${colors.secondary}15`
                        : "none",
                    border:
                      msg.role === "ai"
                        ? `1px solid ${colors.secondary}20`
                        : "none",
                  }}
                >
                  {msg.content}
                </div>

                {/* User Avatar */}
                {msg.role === "user" && (
                  <Avatar
                    size="default"
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <AvatarFallback
                      style={{
                        background: colors.tertiary,
                        color: colors.onPrimary,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      Y
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div
          id="chat-input-area"
          style={{
            padding: "16px 40px 24px",
            background: colors.surface,
            borderTop: `1px solid ${colors.secondary}20`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: colors.neutral,
              borderRadius: 16,
              padding: "6px 6px 6px 20px",
              border: `1px solid ${colors.secondary}30`,
              transition: "border-color 0.15s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `${colors.tertiary}60`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${colors.secondary}30`;
            }}
          >
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe how you're feeling…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: colors.primary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <Button
              id="send-button"
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: input.trim() ? colors.tertiary : `${colors.secondary}30`,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
                transition: "background 0.15s ease",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <Send
                size={18}
                color={input.trim() ? colors.onPrimary : colors.secondary}
              />
            </Button>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              color: colors.secondary,
              marginTop: 10,
              letterSpacing: "0.04em",
            }}
          >
            Clinic Sage provides general wellness guidance. Always consult your
            healthcare provider.
          </p>
        </div>
      </main>
    </div>
  );
}

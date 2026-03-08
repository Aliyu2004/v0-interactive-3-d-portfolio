"use client";

import { useState } from "react";
import { Send, Mail, Phone, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { portfolioData } from "@/lib/portfolio-data";
import { vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface ContactPanelProps {
  isVisible: boolean;
}

export function ContactPanel({ isVisible }: ContactPanelProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    vibrate(30);
    setIsSubmitting(true);

    try {
      const response = await fetch(portfolioData.formspree, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        vibrate(100);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 max-w-xs md:max-w-sm w-full">
      <div className="rounded-2xl bg-background/80 backdrop-blur-md border border-fuchsia-500/20 p-4 md:p-6">
        <h3 className="text-lg font-bold text-fuchsia-400 mb-4">Get in Touch</h3>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-400" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h4>
            <p className="text-sm text-muted-foreground">
              Thanks for reaching out. I'll get back to you soon!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitted(false)}
              className="mt-4"
            >
              Send Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-muted-foreground">
                Name
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-muted/50 border-border/50"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-muted/50 border-border/50"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm text-muted-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-muted/50 border-border/50 min-h-[80px]"
                placeholder="Your message..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              {portfolioData.personal.email}
            </a>
            <a
              href={`tel:${portfolioData.personal.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {portfolioData.personal.phone}
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-3 mt-4">
            <SocialButton
              href={portfolioData.social.twitter}
              label="Twitter"
              icon={
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
            />
            <SocialButton
              href={portfolioData.social.whatsapp}
              label="WhatsApp"
              icon={
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
            />
            <SocialButton
              href={portfolioData.social.email}
              label="Email"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>

          {/* Resume download */}
          <Button
            asChild
            variant="outline"
            className="w-full mt-4 gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <a href={portfolioData.personal.resumeUrl} download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialButton({ href, label, icon }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center",
        "bg-muted/50 text-muted-foreground",
        "hover:bg-cyan-500/20 hover:text-cyan-400",
        "transition-colors"
      )}
      aria-label={label}
      onClick={() => vibrate(20)}
    >
      {icon}
    </a>
  );
}

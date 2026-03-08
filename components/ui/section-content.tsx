"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Mail, Phone, Download, Loader2, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { portfolioData } from "@/lib/portfolio-data";
import { vibrate } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/camera-path";

interface SectionContentProps {
  section: Section;
  onNavigate: (sectionId: string) => void;
}

export function SectionContent({ section, onNavigate }: SectionContentProps) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
        <div className="pointer-events-auto w-full max-w-4xl">
          {section.id === "welcome" && <WelcomeSection onNavigate={onNavigate} />}
          {section.id === "about" && <AboutSection />}
          {section.id === "skills" && <SkillsSection />}
          {section.id === "projects" && <ProjectsSection />}
          {section.id === "timeline" && <TimelineSection />}
          {section.id === "contact" && <ContactSection />}
        </div>
      </div>
    </div>
  );
}

// Welcome Section
function WelcomeSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="text-center space-y-6 md:space-y-8">
      {/* Profile */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 blur-xl opacity-50 scale-110" />
          <Image
            src={portfolioData.personal.profileImage}
            alt={portfolioData.personal.name}
            width={120}
            height={120}
            className="relative rounded-full border-2 border-cyan-400/50 object-cover md:w-32 md:h-32"
          />
        </div>
      </div>

      {/* Name & Title */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 text-balance">
          {portfolioData.personal.name}
        </h1>
        <p className="text-lg md:text-xl text-cyan-400 font-medium">
          {portfolioData.personal.title}
        </p>
      </div>

      {/* Tagline */}
      <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto text-pretty">
        {portfolioData.about.headline}
      </p>

      {/* Quick navigation buttons */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {["about", "skills", "projects", "contact"].map((id) => (
          <Button
            key={id}
            variant="outline"
            size="lg"
            onClick={() => {
              vibrate(30);
              onNavigate(id);
            }}
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 min-h-[48px] capitalize"
          >
            {id === "about" ? "About Me" : id}
          </Button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center pt-8 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </div>
  );
}

// About Section
function AboutSection() {
  return (
    <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-cyan-500/20 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Profile */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 blur-md opacity-50" />
            <Image
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              width={120}
              height={120}
              className="relative rounded-full border-2 border-cyan-400/50 object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {portfolioData.personal.name}
          </h2>
          <p className="text-sm text-cyan-400">{portfolioData.personal.title}</p>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            About Me
          </h3>
          <p className="text-lg font-semibold text-cyan-400">
            {portfolioData.about.headline}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {portfolioData.about.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {portfolioData.about.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-cyan-500/10"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="text-sm text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skills Section
const categoryColors: Record<string, string> = {
  frontend: "#00f0ff",
  backend: "#ff00ff",
  ai: "#8b5cf6",
  tools: "#00ff88",
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI & ML",
  tools: "Tools",
};

function SkillsSection() {
  const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

  return (
    <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-cyan-500/20 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Technical Skills
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="space-y-3">
            <h4
              className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
              style={{ color: categoryColors[category] }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[category] }}
              />
              {categoryLabels[category] || category}
            </h4>
            <div className="space-y-2">
              {skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={categoryColors[category]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted-foreground/20 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${level}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-fuchsia-500/20 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        My Projects
      </h3>

      <div className="space-y-4">
        {portfolioData.projects.map((project) => (
          <div
            key={project.id}
            className={cn(
              "rounded-xl border transition-all duration-300 overflow-hidden",
              expandedProject === project.id
                ? "border-fuchsia-500/50 bg-fuchsia-500/5"
                : "border-border/50 bg-muted/20 hover:border-fuchsia-500/30"
            )}
          >
            {/* Header */}
            <button
              onClick={() => {
                vibrate(20);
                setExpandedProject(expandedProject === project.id ? null : project.id);
              }}
              className="w-full p-4 flex items-center justify-between text-left min-h-[60px]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />
                <div>
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                </div>
              </div>
              <ChevronRight
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  expandedProject === project.id && "rotate-90"
                )}
              />
            </button>

            {/* Expanded content */}
            {expandedProject === project.id && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-muted/50 text-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link && project.link !== "#" && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500/10"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View Project
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Timeline Section
function TimelineSection() {
  const timelineColors = ["#00f0ff", "#ff00ff", "#8b5cf6", "#6d28d9"];

  return (
    <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-purple-500/20 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Career Journey
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-purple-600" />

        {/* Timeline items */}
        <div className="space-y-6">
          {portfolioData.timeline.map((item, index) => (
            <div key={index} className="relative pl-10 md:pl-14">
              {/* Dot */}
              <div
                className="absolute left-2 md:left-4 top-1 w-4 h-4 rounded-full border-2"
                style={{
                  backgroundColor: timelineColors[index],
                  borderColor: timelineColors[index],
                  boxShadow: `0 0 12px ${timelineColors[index]}80`,
                }}
              />

              {/* Content */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: timelineColors[index] }}
                >
                  {item.year}
                </span>
                <h4 className="text-lg font-semibold text-foreground mt-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Section
function ContactSection() {
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
        headers: { "Content-Type": "application/json" },
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

  return (
    <div className="rounded-2xl bg-background/90 backdrop-blur-md border border-fuchsia-500/20 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Get in Touch
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Thanks for reaching out. I'll get back to you soon!
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted/50 border-border/50 min-h-[48px]"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-muted/50 border-border/50 min-h-[48px]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-muted-foreground">Message</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-muted/50 border-border/50 min-h-[120px]"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white min-h-[48px]"
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
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-cyan-500/10 transition-colors min-h-[48px]"
              >
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-foreground break-all">{portfolioData.personal.email}</span>
              </a>
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-cyan-500/10 transition-colors min-h-[48px]"
              >
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-foreground">{portfolioData.personal.phone}</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <SocialButton
                href={portfolioData.social.twitter}
                label="Twitter"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <SocialButton
                href={portfolioData.social.whatsapp}
                label="WhatsApp"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                }
              />
              <SocialButton
                href={portfolioData.social.email}
                label="Email"
                icon={<Mail className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* Resume Download */}
          <Button
            asChild
            variant="outline"
            className="w-full gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 min-h-[48px]"
          >
            <a href={portfolioData.personal.resumeUrl} download>
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center",
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

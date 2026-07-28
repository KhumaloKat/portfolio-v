"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomeText from "./ui/CustomeText";
import emailjs from "@emailjs/browser";

type StatusType = "idle" | "success" | "error";

type EmailJSError = {
  status?: number;
  text?: string;
  message?: string;
  stack?: string;
  name?: string;
};

function extractEmailJSError(error: unknown): EmailJSError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === "object" && error !== null) {
    const maybe = error as Record<string, unknown>;
    return {
      status: typeof maybe.status === "number" ? maybe.status : undefined,
      text: typeof maybe.text === "string" ? maybe.text : undefined,
      message: typeof maybe.message === "string" ? maybe.message : undefined,
      stack: typeof maybe.stack === "string" ? maybe.stack : undefined,
      name: typeof maybe.name === "string" ? maybe.name : undefined,
    };
  }

  return {};
}

const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_ugilufa",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_lezac9x",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "bIqxrsbZSTRgcErxl",
};

const Footer = () => {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  // Initialize EmailJS only when a public key is available.
  useEffect(() => {
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.info("[EmailJS] Public key detected and initialized.");
      return;
    }

    console.warn("[EmailJS] NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not set. Submission will still be attempted using existing EmailJS configuration.");
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) {
      return;
    }

    setStatusMessage("");
    setStatusType("idle");

    const payload = {
      from_name: formData.from_name.trim(),
      from_email: formData.from_email.trim(),
      subject: formData.subject.trim() || "No Subject",
      message: formData.message.trim(),
      to_email: "khumalosiya2001@gmail.com",
    };

    if (!payload.from_name || !payload.from_email || !payload.message) {
      setStatusType("error");
      setStatusMessage("Unable to send message. Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(payload.from_email)) {
      setStatusType("error");
      setStatusMessage("Unable to send message. Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    try {
      console.info("[EmailJS] Sending request...", {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
      });

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        payload,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );

      console.info("[EmailJS] Success response:", {
        status: response.status,
        text: response.text,
      });

      setStatusType("success");
      setStatusMessage("Message sent successfully.");
      setFormData({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      const emailError = extractEmailJSError(error);

      console.warn("[EmailJS] Request failed", {
        error,
        name: emailError.name,
        status: emailError.status,
        text: emailError.text,
        message: emailError.message,
        stack: emailError.stack,
      });

      setStatusType("error");
      const reason = emailError.text || emailError.message;
      setStatusMessage(
        reason
          ? `Unable to send message. ${reason}`
          : "Unable to send message. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer id="contact" className="section-shell relative w-full min-h-screen bg-[#0f1115] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-[71px] gap-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(123,125,122,0.35),transparent_45%)]" />

      <div className="w-full max-w-4xl text-center flex flex-col items-center gap-4 relative z-10">
        <CustomeText
          title="Contact Me"
          className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-[#FCFCFD]"
        />
      </div>

      <div className="w-full max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
        <div className="gpu-layer rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-2xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder="Name*"
                required
                className="gpu-layer w-full rounded-full border border-white/35 bg-white/15 px-4 py-3 text-base text-white outline-none placeholder:text-white/65 backdrop-blur-xl transition-[transform,opacity,filter] duration-300 focus:brightness-110"
              />
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                placeholder="Email*"
                required
                className="gpu-layer w-full rounded-full border border-white/35 bg-white/15 px-4 py-3 text-base text-white outline-none placeholder:text-white/65 backdrop-blur-xl transition-[transform,opacity,filter] duration-300 focus:brightness-110"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="gpu-layer w-full rounded-full border border-white/35 bg-white/15 px-4 py-3 text-base text-white outline-none placeholder:text-white/65 backdrop-blur-xl transition-[transform,opacity,filter] duration-300 focus:brightness-110"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={6}
              required
              className="gpu-layer w-full rounded-[24px] border border-white/35 bg-white/15 px-4 py-3 text-base text-white outline-none placeholder:text-white/65 backdrop-blur-xl transition-[transform,opacity,filter] duration-300 focus:brightness-110"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSending}
                className="gpu-layer w-full sm:w-fit rounded-full border border-white/35 bg-white/15 px-8 py-3 text-lg font-semibold text-white backdrop-blur-xl transition-[transform,opacity,filter] duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? "Sending..." : "Send"}
              </button>

              {statusMessage ? (
                <p className={`text-sm ${statusType === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                  {statusMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="gpu-layer rounded-[32px] border border-white/30 bg-white/10 backdrop-blur-2xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">Khumalo Katleho</h3>
              <p className="text-white/70">Computer System Engineer</p>
            </div>

            <div className="space-y-4 text-white/90">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Phone</p>
                <a href="tel:+27641622166" className="mt-1 inline-block transition-[transform,opacity,filter] duration-300 hover:brightness-110">+27 64 162 2166</a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Email</p>
                <a href="mailto:khumalosiya2001@gmail.com" className="mt-1 inline-block transition-[transform,opacity,filter] duration-300 hover:brightness-110">khumalosiya2001@gmail.com</a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">GitHub</p>
                <a href="https://github.com/KhumaloKat" target="_blank" rel="noreferrer" className="mt-1 inline-block transition-[transform,opacity,filter] duration-300 hover:brightness-110">KhumaloKat</a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.linkedin.com/in/khumalo-kat/" target="_blank" rel="noreferrer" className="gpu-layer rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-[transform,opacity,filter] duration-300 hover:scale-[1.03] hover:brightness-110">LinkedIn</a>
              <a href="https://www.instagram.com/khumalo_kat/" target="_blank" rel="noreferrer" className="gpu-layer rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-[transform,opacity,filter] duration-300 hover:scale-[1.03] hover:brightness-110">Instagram</a>
              <a href="https://www.facebook.com/khumalo.kat/" target="_blank" rel="noreferrer" className="gpu-layer rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-[transform,opacity,filter] duration-300 hover:scale-[1.03] hover:brightness-110">Facebook</a>
              <a href="https://x.com/khumalo_kat" target="_blank" rel="noreferrer" className="gpu-layer rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-medium text-white transition-[transform,opacity,filter] duration-300 hover:scale-[1.03] hover:brightness-110">X</a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t border-white/20 pt-6 text-center text-sm text-white/70 relative z-10">
        <p>© copyright KhumaloKat design | 2025</p>
      </div>
    </footer>
  );
};

export default Footer;

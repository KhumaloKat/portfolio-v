import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/data";

export const runtime = "nodejs";

type ContactPayload = {
  from_name?: unknown;
  from_email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? site.email;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Resend is not configured. Add RESEND_API_KEY to your environment." },
      { status: 500 }
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fromName = asTrimmedString(body.from_name);
  const fromEmail = asTrimmedString(body.from_email);
  const subject = asTrimmedString(body.subject) || "Portfolio contact";
  const message = asTrimmedString(body.message);

  if (!fromName || !fromEmail || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isValidEmail(fromEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: fromEmail,
    subject: `${subject} — ${fromName}`,
    text: `Name: ${fromName}\nEmail: ${fromEmail}\nSubject: ${subject}\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
        <p><strong>Name:</strong> ${escapeHtml(fromName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fromEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message || "Unable to send message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

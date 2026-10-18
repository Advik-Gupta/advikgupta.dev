import nodemailer from "nodemailer";

export const runtime = "nodejs";

const LIMITS = {
  name: 120,
  company: 120,
  country: 80,
  email: 200,
  phone: 40,
  message: 5000,
  timeline: 40,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

function transporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    return Response.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) return Response.json({ ok: true });

  const data = {
    name: clean(body.name, LIMITS.name),
    company: clean(body.company, LIMITS.company),
    country: clean(body.country, LIMITS.country),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    message: clean(body.message, LIMITS.message),
    timeline: clean(body.timeline, LIMITS.timeline),
    needs: Array.isArray(body.needs)
      ? body.needs
          .map((n) => clean(n, 40))
          .filter(Boolean)
          .slice(0, 10)
      : [],
  };

  if (!data.name || !data.message || !EMAIL_RE.test(data.email)) {
    return Response.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 },
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Country", data.country],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Needs", data.needs.join(", ")],
    ["Timeline", data.timeline],
  ].filter(([, v]) => v) as [string, string][];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#666;vertical-align:top"><b>${k}</b></td><td>${escape(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escape(data.message)}</p>
  `;

  try {
    await transporter().sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: `${data.name.replace(/[<>"]/g, "")} <${data.email}>`,
      subject: `New enquiry from ${data.name.replace(/[\r\n]/g, " ")}${data.company ? ` (${data.company.replace(/[\r\n]/g, " ")})` : ""}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed", error);
    return Response.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }
}

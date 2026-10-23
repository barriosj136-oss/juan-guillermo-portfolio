import { appendFile, mkdir } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;
const maxPerWindow = 5;
const maxBodyBytes = 16_000;
const topics = new Set(["job-opportunity", "professional-networking", "other"]);

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength) : "";
}

function allowLocalSubmission(key: string) {
  const now = Date.now();
  for (const [candidate, entry] of rateLimit) if (entry.resetAt <= now) rateLimit.delete(candidate);
  const entry = rateLimit.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxPerWindow) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  // This endpoint is intentionally unavailable in production. A real hosted inbox
  // needs a configured, secured persistence and delivery provider.
  if (process.env.NODE_ENV !== "development") return fail("Local contact capture is disabled outside development.", 404);

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  try {
    if (!origin || !host || new URL(origin).host !== host) return fail("This request is not allowed.", 403);
  } catch {
    return fail("This request is not allowed.", 403);
  }

  const contentType = request.headers.get("content-type") || "";
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (!contentType.toLowerCase().includes("application/json")) return fail("Send the form using JSON.", 415);
  if (declaredLength > maxBodyBytes) return fail("The message is too large.", 413);

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > maxBodyBytes) return fail("The message is too large.", 413);

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return fail("The form could not be read. Please check the fields and try again.", 400);
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("The form could not be read.", 400);

  const record = input as Record<string, unknown>;
  if (clean(record.website, 200)) return NextResponse.json({ ok: true });
  const name = clean(record.name, 80);
  const email = clean(record.email, 254).toLowerCase();
  const organization = clean(record.organization, 120);
  const topic = clean(record.topic, 40);
  const message = clean(record.message, 3000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !topics.has(topic) || message.length < 10 || record.consent !== true) {
    return fail("Please check your name, email, message, topic, and local-storage consent.", 400);
  }

  const clientKey = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim().slice(0, 80);
  if (!allowLocalSubmission(clientKey)) return fail("Too many local submissions. Please wait a few minutes and try again.", 429);

  const portfolioRoot = process.cwd();
  const configuredPath = process.env.CONTACT_STORAGE_PATH || ".local-data/contact-submissions.jsonl";
  if (isAbsolute(configuredPath)) return fail("The local contact-storage path must stay inside the project.", 500);
  const storagePath = resolve(portfolioRoot, configuredPath);
  const pathFromRoot = relative(portfolioRoot, storagePath);
  if (!pathFromRoot || pathFromRoot === ".." || pathFromRoot.startsWith(`..${sep}`) || pathFromRoot.split(sep).includes("public")) {
    return fail("The local contact-storage path must stay private inside the project.", 500);
  }

  try {
    await mkdir(resolve(storagePath, ".."), { recursive: true });
    const submission = { receivedAt: new Date().toISOString(), name, email, organization, topic, message, consentToLocalStorage: true };
    await appendFile(storagePath, `${JSON.stringify(submission)}\n`, { encoding: "utf8", flag: "a" });
    return NextResponse.json({ ok: true });
  } catch {
    return fail("The local inbox could not save this message. Please use LinkedIn instead.", 500);
  }
}

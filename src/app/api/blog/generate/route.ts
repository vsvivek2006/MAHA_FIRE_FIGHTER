import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/generateBlogPost";
import { createSessionClient, createAdminClient } from "@/lib/supabase/server";

// In-memory sliding-window IP rate limiter: max 10 requests per minute
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const record = ipHits.get(ip);
  if (!record || now > record.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Check
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before generating more articles." },
        { status: 429 }
      );
    }

    // 2. Authentication Check (Cookie or Bearer Token)
    let authenticatedUser = null;

    try {
      const supabase = await createSessionClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authenticatedUser = user;
    } catch {
      // Cookie parsing fallback
    }

    if (!authenticatedUser) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.slice(7).trim();
        try {
          const adminClient = createAdminClient();
          const { data } = await adminClient.auth.getUser(token);
          authenticatedUser = data?.user || null;
        } catch {
          // Token verification fallback
        }
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in as an administrator to use the AI blog generator." },
        { status: 401 }
      );
    }

    // 3. Request Body Parsing & Sanitization
    const body = await request.json();
    const { topic, tone, keywords, wordCount, audience, model } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    // Strict input clamping
    const safeTopic = String(topic).slice(0, 500);
    const safeTone = tone ? String(tone).slice(0, 100) : undefined;
    const safeAudience = audience ? String(audience).slice(0, 200) : undefined;
    const safeModel = model ? String(model).slice(0, 100) : undefined;
    const safeWordCount =
      typeof wordCount === "number"
        ? Math.min(Math.max(Math.round(wordCount), 200), 3000)
        : undefined;
    const safeKeywords = Array.isArray(keywords)
      ? keywords.slice(0, 10).map((k: unknown) => String(k).slice(0, 60))
      : undefined;

    // 4. Generate Content
    const result = await generateBlogPost({
      topic: safeTopic,
      tone: safeTone,
      keywords: safeKeywords,
      wordCount: safeWordCount,
      audience: safeAudience,
      model: safeModel,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate blog post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

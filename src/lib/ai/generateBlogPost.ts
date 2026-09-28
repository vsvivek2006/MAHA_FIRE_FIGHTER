import { generateBlogPostWithGroq } from "./providers/groq";

export interface GenerateBlogPostInput {
  topic: string;
  tone?: string;            // e.g. "Professional & Authoritative", "Technical & Analytical"
  keywords?: string[];      // SEO keywords to naturally include
  wordCount?: number;       // approx target length
  audience?: string;        // e.g. "Industrial facility managers in Delhi NCR"
  model?: string;           // AI model ID (e.g. "openai/gpt-oss-120b")
}

export interface GenerateBlogPostOutput {
  title: string;
  metaDescription: string;
  content: string;          // Semantic HTML, ready for rendering
  suggestedTags: string[];
}

export async function generateBlogPost(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  const provider = process.env.AI_PROVIDER || "groq";

  switch (provider.toLowerCase()) {
    case "groq":
      return generateBlogPostWithGroq(input);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

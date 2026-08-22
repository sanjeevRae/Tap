import "server-only";
import sanitizeHtml from "sanitize-html";
import {
  buildNumberedTree,
  getPolicyBySlug,
  getSections,
  type NumberedSection,
  type Policy,
  type PolicySection,
} from "@/lib/policies";

// ---------- Sanitization (XSS protection for admin-generated rich text) ----------

export function sanitizePolicyHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "h1", "h2", "h3", "h4",
      "ul", "ol", "li", "blockquote", "a", "img", "code", "pre", "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      // Force safe external links
      a: (tagName, attribs) => {
        const href = attribs.href || "#";
        const external = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: external
            ? { ...attribs, href, target: "_blank", rel: "noopener noreferrer" }
            : { href },
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, src: attribs.src || "", alt: attribs.alt || "", loading: "lazy" },
      }),
    },
    disallowedTagsMode: "discard",
  });
}

// ---------- Public fetchers (client SDK used from server components) ----------
// Pages cache with revalidate; publishing calls revalidatePolicy(slug)
// to bust the exact page instantly. No firebase-admin needed.

export type PublicPolicy = Policy & { tree: NumberedSection[] };

export async function getPublicPolicy(slug: string): Promise<PublicPolicy | null> {
  const policy = await getPolicyBySlug(slug);
  if (!policy || policy.status !== "published") return null;

  const sections = await getSections(policy.id);
  const sanitized: PolicySection[] = sections.map((s) => ({
    ...s,
    content: sanitizePolicyHtml(s.content || ""),
  }));

  return { ...policy, tree: buildNumberedTree(sanitized) };
}

export async function getAllPublicPolicies(): Promise<Policy[]> {
  const { getAllPolicies } = await import("@/lib/policies");
  return getAllPolicies();
}

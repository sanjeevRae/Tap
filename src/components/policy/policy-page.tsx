import Link from "next/link";
import { getPublicPolicy } from "@/lib/policies-server";
import { PolicyToc } from "@/components/policy/policy-toc";
import type { NumberedSection } from "@/lib/policies";

export const revalidate = 3600; // 1 hour server-side cache

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return null;
  }
}

function SectionBlock({ section }: { section: NumberedSection }) {
  return (
    <section id={section.anchorId} className="scroll-mt-24">
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
        <span className="mr-2 tabular-nums text-neutral-400">{section.number}.</span>
        {section.title}
      </h2>
      <div
        className="policy-prose mt-3 text-[0.95rem] leading-7 text-neutral-700"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
      {section.children.map((child) => (
        <div key={child.anchorId} className="mt-8">
          <SectionBlock section={child} />
        </div>
      ))}
    </section>
  );
}

export default async function PolicyPage({ slug, title }: { slug: string; title: string }) {
  let policy: Awaited<ReturnType<typeof getPublicPolicy>> = null;
  let failed = false;
  try {
    policy = await getPublicPolicy(slug);
  } catch {
    failed = true;
  }

  const updated = formatDate(policy?.lastUpdated);

  return (
    <main className="min-h-dvh bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-100 bg-[#fbfaff]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Link href="/" className="text-xs font-semibold uppercase tracking-widest text-brand hover:underline">
            Chitra Tap
          </Link>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{policy?.title || title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
            {updated ? <span>Last updated: <time className="font-medium text-neutral-700">{updated}</time></span> : null}
            {policy?.version ? <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">v{policy.version}</span> : null}
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {failed ? (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-10 text-center">
            <p className="text-base font-semibold">Policy temporarily unavailable</p>
            <p className="mt-1.5 text-sm text-neutral-500">We&apos;re having trouble loading this page. Please try again shortly.</p>
            <Link href="/" className="mt-5 inline-block rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Back to home</Link>
          </div>
        ) : !policy ? (
          <div className="rounded-xl border border-dashed border-neutral-200 p-10 text-center">
            <p className="text-base font-semibold">This policy hasn&apos;t been published yet</p>
            <p className="mt-1.5 text-sm text-neutral-500">Please check back soon.</p>
            <Link href="/" className="mt-5 inline-block rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">Back to home</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
            <PolicyToc tree={policy.tree} />
            <article className="min-w-0 space-y-10">
              {policy.tree.map((section) => (
                <SectionBlock key={section.anchorId} section={section} />
              ))}
              <hr className="border-neutral-100" />
              <p className="text-sm text-neutral-500">
                Questions about this policy? Contact us at{" "}
                <a href="mailto:info@chitratech.com.np" className="font-medium text-brand underline underline-offset-2">info@chitratech.com.np</a>.
              </p>
            </article>
          </div>
        )}
      </div>
    </main>
  );
}

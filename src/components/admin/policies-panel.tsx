"use client";

import * as React from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Eye,
  FileText,
  Plus,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import {
  buildNumberedTree,
  deleteSectionFromDb,
  getAllPolicies,
  getPolicyBySlug,
  getSections,
  savePolicyMeta,
  upsertSection,
  type Policy,
  type PolicySection,
} from "@/lib/policies";

// ---------- Policies list ----------

export function PoliciesPanel({ onFlash }: { onFlash: (msg: string) => void }) {
  const [policies, setPolicies] = React.useState<Policy[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingSlug, setEditingSlug] = React.useState<string | null>(null);
  const [previewPolicy, setPreviewPolicy] = React.useState<null | { title: string; tree: ReturnType<typeof buildNumberedTree> }>(null);

  React.useEffect(() => {
    getAllPolicies().then(setPolicies).finally(() => setLoading(false));
  }, []);

  async function openPreview(p: Policy) {
    const sections = await getSections(p.id);
    setPreviewPolicy({ title: p.title, tree: buildNumberedTree(sections) });
  }

  if (editingSlug) {
    return <PolicyEditor slug={editingSlug} onBack={async () => { setEditingSlug(null); setPolicies(await getAllPolicies()); }} onFlash={onFlash} />;
  }

  return (
    <div className="grid gap-4">
      <Card>
        <p className="text-sm font-semibold tracking-tight">Policies</p>
        <p className="mt-0.5 text-xs text-neutral-500">Manage the public legal pages. Changes go live only when published.</p>
        <div className="mt-4 divide-y divide-neutral-100">
          {loading ? <p className="py-6 text-sm text-neutral-400">Loading…</p> : null}
          {policies.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-3 py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-600">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.title}</p>
                <p className="truncate text-xs text-neutral-500">
                  /{p.slug} · v{p.version}
                  {p.lastUpdated ? ` · updated ${new Date(p.lastUpdated).toLocaleDateString()}` : ""}
                  {p.publishedAt ? ` · published ${new Date(p.publishedAt).toLocaleDateString()}` : ""}
                </p>
              </div>
              <StatusBadge status={p.status} />
              <div className="flex gap-1.5">
                <MiniBtn onClick={() => openPreview(p)} icon={Eye} label="Preview" />
                <MiniBtn onClick={() => setEditingSlug(p.slug)} icon={Save} label="Edit" primary />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {previewPolicy ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-5 py-3 backdrop-blur">
            <p className="text-sm font-semibold">Preview — {previewPolicy.title}</p>
            <button onClick={() => setPreviewPolicy(null)} type="button" className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50">Close preview</button>
          </div>
          <div className="mx-auto max-w-2xl px-5 py-10">
            {previewPolicy.tree.map((s) => (
              <PreviewSection key={s.anchorId} section={s} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PreviewSection({ section }: any) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold"><span className="mr-2 text-neutral-400">{section.number}.</span>{section.title}</h2>
      <div className="policy-prose mt-2 text-sm leading-6 text-neutral-700" dangerouslySetInnerHTML={{ __html: section.content }} />
      {section.children?.map((c: any) => <PreviewSection key={c.anchorId} section={c} />)}
    </section>
  );
}

// ---------- Policy editor ----------

function PolicyEditor({ slug, onBack, onFlash }: { slug: string; onBack: () => void; onFlash: (m: string) => void }) {
  const [policy, setPolicy] = React.useState<Policy | null>(null);
  const [sections, setSections] = React.useState<PolicySection[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);
  const [confirmPublish, setConfirmPublish] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      let p = await getPolicyBySlug(slug);
      if (!p) {
        // First time: create the policy doc
        const { POLICY_SLUGS } = await import("@/lib/policies");
        const titles: Record<string, string> = {
          "privacy-policy": "Privacy Policy",
          "terms-and-conditions": "Terms & Conditions",
          "refund-policy": "Refund Policy",
        };
        await savePolicyMeta("", {} as any); // no-op guard
        p = await ensureSeeded(slug as any, titles[slug] || slug);
      }
      setPolicy(p);
      setSections(await getSections(p.id));
    })();
  }, [slug]);

  async function ensureSeeded(slug: string, title: string): Promise<Policy> {
    const { doc: fsDoc, setDoc, serverTimestamp } = await import("@firebase/firestore");
    const { db } = await import("@/lib/firebase");
    const ref = fsDoc(db!, "policies", slug);
    const data = { slug, title, status: "draft", version: "1.0", createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    await setDoc(ref, data, { merge: true });
    return { id: ref.id, ...(data as any) };
  }

  function updateSection(id: string, patch: Partial<PolicySection>) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    setDirty(true);
  }

  async function addSection(parentId: string | null) {
    if (!policy) return;
    const siblings = sections.filter((s) => s.parentId === parentId);
    const next: PolicySection = {
      id: crypto.randomUUID(),
      policyId: policy.id,
      parentId,
      title: "New section",
      content: "<p></p>",
      displayOrder: siblings.length,
    };
    setSections((prev) => [...prev, next]);
    setDirty(true);
  }

  async function removeSection(id: string) {
    setDeleteId(null);
    setSections((prev) => prev.filter((s) => s.id !== id && s.parentId !== id));
    setDirty(true);
  }

  function move(index: number, dir: -1 | 1) {
    const tops = sections.filter((s) => !s.parentId).sort((a, b) => a.displayOrder - b.displayOrder);
    const target = tops[index];
    const swap = tops[index + dir];
    if (!target || !swap) return;
    updateSection(target.id, { displayOrder: swap.displayOrder });
    updateSection(swap.id, { displayOrder: target.displayOrder });
  }

  async function saveDraft() {
    if (!policy) return;
    setSaving(true);
    try {
      await savePolicyMeta(policy.id, { title: policy.title, version: policy.version });
      await Promise.all(sections.map((s) => upsertSection(s)));
      setDirty(false);
      onFlash("Draft saved.");
    } catch {
      onFlash("Save failed. Check your connection and rules.");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    if (!policy) return;
    setConfirmPublish(false);
    setSaving(true);
    try {
      await savePolicyMeta(policy.id, {
        title: policy.title,
        version: policy.version,
        status: "published",
        lastUpdated: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      });
      await Promise.all(sections.map((s) => upsertSection(s)));
      setDirty(false);
      setPolicy({ ...policy, status: "published", lastUpdated: new Date().toISOString(), publishedAt: new Date().toISOString() });
      onFlash("Policy published.");
      // Bust this policy's public page cache immediately
      await fetch(`/api/policies/revalidate?slug=${policy.slug}`, { method: "POST" }).catch(() => {});
    } catch {
      onFlash("Publish failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function unpublish() {
    if (!policy) return;
    await savePolicyMeta(policy.id, { status: "draft" });
    setPolicy({ ...policy, status: "draft" });
    onFlash("Policy unpublished.");
    await fetch(`/api/policies/revalidate?slug=${policy.slug}`, { method: "POST" }).catch(() => {});
  }

  if (!policy) return <Card><p className="text-sm text-neutral-400">Loading…</p></Card>;

  const tops = sections.filter((s) => !s.parentId).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="grid gap-4">
      {/* Toolbar */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={onBack} type="button" aria-label="Back" className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-neutral-500 hover:bg-neutral-100">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <input
              value={policy.title}
              onChange={(e) => { setPolicy({ ...policy, title: e.target.value }); setDirty(true); }}
              className="min-w-0 flex-1 bg-transparent text-base font-semibold tracking-tight outline-none"
            />
            <StatusBadge status={policy.status} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-neutral-500">
              Version
              <input value={policy.version} onChange={(e) => { setPolicy({ ...policy, version: e.target.value }); setDirty(true); }}
                className="ml-1.5 h-8 w-16 rounded-md border border-neutral-200 px-2 text-sm outline-none focus:border-neutral-400" />
            </label>
            <button onClick={saveDraft} disabled={saving || !dirty} type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50">
              <Save className="h-4 w-4" /> Save Draft
            </button>
            {policy.status === "published" ? (
              <button onClick={unpublish} type="button" className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50">Unpublish</button>
            ) : null}
            <button onClick={() => setConfirmPublish(true)} disabled={saving} type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50">
              <Send className="h-4 w-4" /> Publish
            </button>
          </div>
        </div>
        {dirty ? <p className="mt-2 text-xs text-amber-600">Unsaved changes — remember to Save Draft.</p> : null}
      </Card>

      {/* Sections */}
      {tops.map((top, i) => (
        <Card key={top.id}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-bold tabular-nums text-neutral-500">{i + 1}</span>
              <input value={top.title} onChange={(e) => updateSection(top.id, { title: e.target.value })}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" placeholder="Section title" />
            </div>
            <div className="flex shrink-0 gap-0.5">
              <IconBtn onClick={() => move(i, -1)} label="Move up" text="↑" disabled={i === 0} />
              <IconBtn onClick={() => move(i, 1)} label="Move down" text="↓" disabled={i === tops.length - 1} />
              <IconBtn onClick={() => addSection(top.id)} label="Add subsection" icon={Plus} />
              <IconBtn onClick={() => setDeleteId(top.id)} label="Delete section" icon={Trash2} danger />
            </div>
          </div>

          <RichText value={top.content} onChange={(html) => updateSection(top.id, { content: html })} />

          {/* Subsections */}
          <div className="mt-4 space-y-4 border-l-2 border-neutral-100 pl-4">
            {sections.filter((s) => s.parentId === top.id).sort((a, b) => a.displayOrder - b.displayOrder).map((sub, si) => (
              <div key={sub.id}>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 rounded-md bg-neutral-50 px-2 py-0.5 text-[0.7rem] font-bold tabular-nums text-neutral-400">{i + 1}.{si + 1}</span>
                  <input value={sub.title} onChange={(e) => updateSection(sub.id, { title: e.target.value })}
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none" placeholder="Subsection title" />
                  <IconBtn onClick={() => setDeleteId(sub.id)} label="Delete subsection" icon={Trash2} danger />
                </div>
                <RichText value={sub.content} onChange={(html) => updateSection(sub.id, { content: html })} compact />
              </div>
            ))}
          </div>
        </Card>
      ))}

      <button onClick={() => addSection(null)} type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 text-sm font-medium text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-800">
        <Plus className="h-4 w-4" /> Add Section
      </button>

      {/* Publish confirm */}
      {confirmPublish ? (
        <Dialog onClose={() => setConfirmPublish(false)}>
          <p className="text-base font-semibold">Publish this policy?</p>
          <p className="mt-2 text-sm text-neutral-500">Are you sure you want to publish this policy? The current live version will be replaced.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setConfirmPublish(false)} type="button" className="rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">Cancel</button>
            <button onClick={publish} type="button" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">Yes, publish</button>
          </div>
        </Dialog>
      ) : null}

      {/* Delete confirm */}
      {deleteId ? (
        <Dialog onClose={() => setDeleteId(null)}>
          <p className="text-base font-semibold">Delete section?</p>
          <p className="mt-2 text-sm text-neutral-500">This removes the section and its subsections after you save. This cannot be undone.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setDeleteId(null)} type="button" className="rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">Cancel</button>
            <button onClick={() => removeSection(deleteId)} type="button" className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">Delete</button>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}

// ---------- Rich text (MDXEditor, already in project deps) ----------

const mdxModules = () => import("@mdxeditor/editor");

function RichText({ value, onChange, compact }: { value: string; onChange: (html: string) => void; compact?: boolean }) {
  const [Editor, setEditor] = React.useState<any>(null);
  const [plugins, setPlugins] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;
    mdxModules().then((m) => {
      if (!mounted) return;
      setEditor(() => m.MDXEditor);
      setPlugins([
        m.undoRedoPlugin,
        m.headingsPlugin,
        m.boldItalicUnderlineTogglesPlugin,
        m.listsPlugin,
        m.linkPlugin,
        m.linkDialogPlugin,
        m.tablePlugin,
        m.thematicBreakPlugin,
        m.toolbarPlugin,
      ]);
    });
    return () => { mounted = false; };
  }, []);

  if (!Editor || !plugins) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)}
      className={`mt-2 w-full resize-y rounded-md border border-neutral-200 p-3 text-sm outline-none focus:border-neutral-400 ${compact ? "min-h-[80px]" : "min-h-[140px]"}`} />;
  }

  // Convert stored HTML -> markdown for editor, markdown -> HTML for storage
  async function htmlToMd(html: string) {
    const turndown = (await import("turndown")).default;
    return new turndown({ headingStyle: "atx" }).turndown(html || "");
  }

  return (
    <div className={`mt-2 overflow-hidden rounded-md border border-neutral-200 ${compact ? "" : ""}`}>
      <LazyMdx editor={Editor} plugins={plugins} value={value} onChange={onChange} htmlToMd={htmlToMd} compact={compact} />
    </div>
  );
}

function LazyMdx({ editor: Editor, plugins, value, onChange, htmlToMd, compact }: any) {
  const [md, setMd] = React.useState<string>("");

  React.useEffect(() => {
    let alive = true;
    htmlToMd(value).then((m: string) => { if (alive) setMd(m); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handle(md: string) {
    setMd(md);
    const marked = (await import("marked")).marked;
    const html = await marked.parse(md, { async: false });
    onChange(html);
  }

  return (
    <Editor
      markdown={md}
      onChange={handle}
      plugins={plugins}
      className={compact ? "min-h-[80px]" : "min-h-[140px]"}
      contentEditableClassName="policy-editor prose-sm"
    />
  );
}

// ---------- Small UI helpers ----------

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${
      status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
    }`}>
      {status === "published" ? <CheckCircle2 className="h-3 w-3" /> : null}{status}
    </span>
  );
}

function MiniBtn({ onClick, label, icon: Icon, primary }: { onClick: () => void; label: string; icon: React.ElementType; primary?: boolean }) {
  return (
    <button onClick={onClick} type="button"
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition ${primary ? "border-transparent bg-neutral-900 text-white hover:bg-neutral-700" : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"}`}>
      <Icon className="h-3.5 w-3.5" />{label}
    </button>
  );
}

function IconBtn({ onClick, label, icon: Icon, text, danger, disabled }: { onClick: () => void; label: string; icon?: React.ElementType; text?: string; danger?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} type="button" aria-label={label} title={label} disabled={disabled}
      className={`grid h-7 w-7 place-items-center rounded-md text-xs transition disabled:opacity-30 ${danger ? "text-red-500 hover:bg-red-50" : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"}`}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : text}
    </button>
  );
}

function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-900/25 p-4 backdrop-blur-[2px]" onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) { return <section className="rounded-xl border border-neutral-200 bg-white p-5">{children}</section>; }

import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "@firebase/firestore";
import { db } from "@/lib/firebase";

// ---------- Types ----------

export type PolicyStatus = "draft" | "published";

export type Policy = {
  id: string;
  slug: string; // privacy-policy | terms-and-conditions | refund-policy
  title: string;
  status: PolicyStatus;
  version: string;
  lastUpdated?: string; // ISO date shown publicly
  publishedAt?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

/** A section. parentId === null/undefined => top-level section, else subsection. */
export type PolicySection = {
  id: string;
  policyId: string;
  parentId: string | null;
  title: string;
  /** Markdown produced by the rich text editor */
  content: string;
  displayOrder: number;
};

export type PolicyWithSections = Policy & { sections: PolicySection[] };

export const POLICY_SLUGS = ["privacy-policy", "terms-and-conditions", "refund-policy"] as const;
export type PolicySlug = (typeof POLICY_SLUGS)[number];

// ---------- Firestore access ----------

const policiesCol = () => collection(db, "policies");
const sectionsCol = (policyId: string) => collection(db, "policies", policyId, "sections");

export async function getPolicyBySlug(slug: string): Promise<Policy | null> {
  const q = query(policiesCol(), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<Policy, "id">) };
}

export async function getAllPolicies(): Promise<Policy[]> {
  const snap = await getDocs(query(policiesCol(), orderBy("slug")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Policy, "id">) }));
}

export async function getSections(policyId: string): Promise<PolicySection[]> {
  const snap = await getDocs(query(sectionsCol(policyId), orderBy("displayOrder")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PolicySection, "id">) }));
}

async function ensurePolicyDoc(slug: PolicySlug, title: string): Promise<Policy> {
  const existing = await getPolicyBySlug(slug);
  if (existing) return existing;
  const ref = doc(policiesCol());
  const policy: Omit<Policy, "id"> = {
    slug,
    title,
    status: "draft",
    version: "1.0",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(ref, policy);
  return { id: ref.id, ...policy };
}

export async function savePolicyMeta(policyId: string, data: Partial<Omit<Policy, "id" | "slug">>) {
  await setDoc(doc(db, "policies", policyId), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function upsertSection(section: PolicySection) {
  await setDoc(doc(db, "policies", section.policyId, "sections", section.id), {
    policyId: section.policyId,
    parentId: section.parentId,
    title: section.title,
    content: section.content,
    displayOrder: section.displayOrder,
  }, { merge: true });
}

export async function deleteSectionFromDb(policyId: string, sectionId: string) {
  const { deleteDoc } = await import("@firebase/firestore");
  // Delete children first (subsections)
  const children = await getDocs(query(sectionsCol(policyId), where("parentId", "==", sectionId)));
  await Promise.all(children.docs.map((d) => deleteDoc(d.ref)));
  await deleteDoc(doc(db, "policies", policyId, "sections", sectionId));
}

// ---------- Numbering (generated at render time, never stored) ----------

export type NumberedSection = PolicySection & {
  number: string; // "2" or "2.1"
  anchorId: string; // stable: section-<id>
  children: NumberedSection[];
};

/**
 * Builds the ordered tree and assigns hierarchical numbers dynamically.
 * Top-level sections are numbered by their order among top-level sections;
 * subsections are numbered parent.child within their parent.
 */
export function buildNumberedTree(sections: PolicySection[]): NumberedSection[] {
  const tops = sections.filter((s) => !s.parentId).sort((a, b) => a.displayOrder - b.displayOrder);
  return tops.map((top, ti) => {
    const kids = sections
      .filter((s) => s.parentId === top.id)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((kid, ki) => ({
        ...kid,
        number: `${ti + 1}.${ki + 1}`,
        anchorId: `section-${kid.id}`,
        children: [],
      }));
    return { ...top, number: `${ti + 1}`, anchorId: `section-${top.id}`, children: kids };
  });
}

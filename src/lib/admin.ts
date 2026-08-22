import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { db } from "@/lib/firebase";
import type { UserProfile } from "@/lib/users";

export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminProfile(profile: UserProfile | null): boolean {
  if (!profile) return false;
  return profile.role === "admin" || ADMIN_EMAILS.includes((profile.email || "").toLowerCase());
}

export async function getMyRole(uid: string): Promise<string> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? ((snap.data() as UserProfile).role ?? "user") : "user";
}

export async function listAllUsers(): Promise<UserProfile[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ ...(d.data() as UserProfile), uid: d.id }));
}

export async function setUserRole(uid: string, role: "user" | "admin") {
  await updateDoc(doc(db, "users", uid), { role, updatedAt: new Date() });
}

export async function getUserSites(ownerId: string) {
  const q = query(collection(db, "sites"), where("ownerId", "==", ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));
}

export async function updateUserAsAdmin(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: new Date() });
}

// ---- Simple platform stats (client-side aggregation; fine for small datasets) ----
export type PlatformStats = {
  totalUsers: number;
  admins: number;
  totalSites: number;
  activeSites: number;
  totalScans: number;
  totalClicks: number;
};

export async function getPlatformStats(users: UserProfile[]): Promise<PlatformStats> {
  const sitesSnap = await getDocs(collection(db, "sites"));
  let activeSites = 0;
  let totalScans = 0;
  let totalClicks = 0;
  sitesSnap.forEach((d) => {
    const s = d.data() as { status?: string; analytics?: { scans?: number; linkClicks?: number } };
    if (s.status === "active") activeSites += 1;
    totalScans += s.analytics?.scans || 0;
    totalClicks += s.analytics?.linkClicks || 0;
  });
  return {
    totalUsers: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    totalSites: sitesSnap.size,
    activeSites,
    totalScans,
    totalClicks,
  };
}

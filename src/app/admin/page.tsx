"use client";

import * as React from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Database,
  Download,
  Edit3,
  FileText,
  LogOut,
  Search,
  Shield,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getUserProfile, type UserProfile } from "@/lib/users";
import {
  getPlatformStats,
  getUserSites,
  isAdminProfile,
  listAllUsers,
  setUserRole,
  updateUserAsAdmin,
  type PlatformStats,
} from "@/lib/admin";
import { PoliciesPanel } from "@/components/admin/policies-panel";

type AdminSection = "overview" | "users" | "policies" | "tools";

const navItems: { id: AdminSection; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "policies", label: "Policies", icon: FileText },
  { id: "tools", label: "Tools", icon: Database },
];

export default function AdminPage() {
  const router = useRouter();
  const [me, setMe] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [denied, setDenied] = React.useState(false);
  const [section, setSection] = React.useState<AdminSection>("overview");

  // Data
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [stats, setStats] = React.useState<PlatformStats | null>(null);
  const [search, setSearch] = React.useState("");
  const [editing, setEditing] = React.useState<UserProfile | null>(null);
  const [impersonating, setImpersonating] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState("");

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.replace("/login"); return; }
      const profile = await getUserProfile(user.uid);
      if (!isAdminProfile(profile)) { setDenied(true); setLoading(false); return; }
      setMe(profile);
      await refreshData();
      setLoading(false);
    });
    return unsub;
  }, [router]);

  async function refreshData() {
    const all = await listAllUsers();
    setUsers(all);
    setStats(await getPlatformStats(all));
  }

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  }

  async function toggleRole(u: UserProfile) {
    const next = u.role === "admin" ? "user" : "admin";
    await setUserRole(u.uid, next);
    flash(`${u.email} is now ${next}`);
    await refreshData();
  }

  async function saveEdit() {
    if (!editing) return;
    await updateUserAsAdmin(editing.uid, { name: editing.name, email: editing.email, photoURL: editing.photoURL || "" });
    setEditing(null);
    flash("User saved.");
    await refreshData();
  }

  function impersonate(u: UserProfile) {
    // Store target uid for support-mode; dashboard reads it to load that user's site.
    sessionStorage.setItem("tapchitra_impersonate", u.uid);
    setImpersonating(u.uid);
    window.open("/dashboard", "_blank");
  }

  function stopImpersonate() {
    sessionStorage.removeItem("tapchitra_impersonate");
    setImpersonating(null);
  }

  function exportCsv() {
    const rows = [
      ["uid", "name", "email", "role"],
      ...users.map((u) => [u.uid, u.name, u.email, u.role]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tapchitra-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    flash("Exported users.csv");
  }

  if (loading) return <main className="grid min-h-dvh place-items-center bg-neutral-50"><div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" /></main>;

  if (denied) return (
    <main className="grid min-h-dvh place-items-center bg-neutral-50 p-6 text-center">
      <div>
        <XCircle className="mx-auto h-10 w-10 text-red-500" />
        <h1 className="mt-4 text-lg font-semibold">Access denied</h1>
        <p className="mt-1 text-sm text-neutral-500">You don&apos;t have admin privileges.</p>
        <button onClick={() => router.replace("/dashboard")} className="mt-5 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white" type="button">Back to dashboard</button>
      </div>
    </main>
  );

  const filtered = users.filter((u) =>
    [u.name, u.email, u.role].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-dvh bg-neutral-50 text-neutral-900">
      {/* Impersonation banner */}
      {impersonating ? (
        <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-sm font-medium text-white">
          <Shield className="h-4 w-4" />
          Support mode active — viewing as another user
          <button onClick={stopImpersonate} className="rounded-md bg-white/20 px-2.5 py-0.5 text-xs font-semibold hover:bg-white/30" type="button">Exit</button>
        </div>
      ) : null}

      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-neutral-200 bg-white px-4 py-6 md:flex">
        <div className="flex items-center gap-2 px-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-neutral-900 text-xs font-bold text-white">A</span>
          <span className="text-sm font-semibold tracking-tight">Admin</span>
        </div>
        <nav className="mt-8 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setSection(item.id)} type="button"
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition ${section === item.id ? "bg-neutral-100 font-medium text-neutral-900" : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"}`}>
                <Icon className="h-4 w-4" />{item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto space-y-1 border-t border-neutral-100 pt-4">
          <button onClick={() => router.push("/dashboard")} type="button" className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900">
            <ArrowLeft className="h-4 w-4" /> My dashboard
          </button>
          <button onClick={() => signOut(auth).then(() => router.replace("/login"))} type="button" className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      <section className="md:ml-60">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 backdrop-blur md:h-16 md:px-8">
          <h1 className="text-sm font-medium tracking-tight capitalize md:text-base">{section}</h1>
          <div className="flex items-center gap-2">
            {notice ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />{notice}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />{me?.email}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-4 p-4 md:p-8">
          {section === "overview" && stats ? (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
                <StatCard label="Admins" value={stats.admins} icon={Shield} />
                <StatCard label="Sites Created" value={stats.totalSites} icon={Activity} />
                <StatCard label="Active Sites" value={stats.activeSites} icon={Activity} />
                <StatCard label="Total Scans" value={stats.totalScans} icon={BarChart3} />
                <StatCard label="Link Clicks" value={stats.totalClicks} icon={BarChart3} />
              </div>

              <Card>
                <p className="text-sm font-semibold tracking-tight">Recent Users</p>
                <div className="mt-4 divide-y divide-neutral-100">
                  {users.slice(-5).reverse().map((u) => (
                    <div key={u.uid} className="flex items-center gap-3 py-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#dbeafe] text-xs font-bold text-[#1d4ed8]">{(u.name || u.email || "?").slice(0, 2).toUpperCase()}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{u.name || "—"}</p>
                        <p className="truncate text-xs text-neutral-500">{u.email}</p>
                      </div>
                      <RoleBadge role={u.role} />
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : null}

          {section === "users" ? (
            <>
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative min-w-0 flex-1 sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or role…"
                    className="h-10 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100" />
                </div>
                <button onClick={exportCsv} type="button" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50">
                  <Download className="h-4 w-4" /> Export CSV
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
                      <th className="py-2.5 pr-4 font-medium">User</th>
                      <th className="py-2.5 pr-4 font-medium">Role</th>
                      <th className="py-2.5 pr-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filtered.map((u) => (
                      <tr key={u.uid} className="transition hover:bg-neutral-50">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dbeafe] text-xs font-bold text-[#1d4ed8]">{(u.name || u.email || "?").slice(0, 2).toUpperCase()}</span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{u.name || "—"}</p>
                              <p className="truncate text-xs text-neutral-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4"><RoleBadge role={u.role} /></td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1.5">
                            <ActionButton onClick={() => impersonate(u)} label="Impersonate" title="Open their dashboard in support mode" />
                            <ActionButton onClick={() => setEditing({ ...u })} label="Edit" icon={Edit3} />
                            <ActionButton onClick={() => toggleRole(u)} label={u.role === "admin" ? "Revoke admin" : "Make admin"} icon={u.role === "admin" ? XCircle : ShieldCheck}
                              danger={u.role === "admin"} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 ? <p className="py-8 text-center text-sm text-neutral-400">No users match your search.</p> : null}
              </div>
            </Card>
            </>
          ) : null}

          {section === "policies" ? <PoliciesPanel onFlash={flash} /> : null}

          {section === "tools" ? <ToolsPanel stats={stats} /> : null}
        </div>
      </section>

      {editing ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-neutral-900/25 backdrop-blur-[2px] md:place-items-center md:p-6">
          <div className="max-h-[92dvh] w-full overflow-auto rounded-t-xl border border-neutral-200 bg-white p-6 shadow-xl md:max-w-md md:rounded-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight">Edit User</h2>
              <button onClick={() => setEditing(null)} type="button" className="text-sm text-neutral-500 hover:text-neutral-900">Close</button>
            </div>
            <div className="mt-5 grid gap-4">
              <Field label="Name" value={editing.name} onChange={(v: string) => setEditing({ ...editing, name: v })} />
              <Field label="Email" value={editing.email} onChange={(v: string) => setEditing({ ...editing, email: v })} />
              <Field label="Photo URL" value={editing.photoURL || ""} onChange={(v: string) => setEditing({ ...editing, photoURL: v })} />
              <label className="text-xs font-medium text-neutral-600">Role
                <select value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-400">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </label>
            </div>
            <button onClick={saveEdit} className="mt-6 w-full rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700" type="button">Save Changes</button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function ToolsPanel({ stats }: { stats: PlatformStats | null }) {
  const [health, setHealth] = React.useState<null | { ok: boolean; latencyMs: number }>(null);

  async function checkFirestore() {
    const start = performance.now();
    try {
      const res = await fetch("/api/pricing");
      setHealth({ ok: res.ok, latencyMs: Math.round(performance.now() - start) });
    } catch {
      setHealth({ ok: false, latencyMs: Math.round(performance.now() - start) });
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <p className="text-sm font-semibold tracking-tight">Firestore Health Check</p>
        <p className="mt-0.5 text-xs text-neutral-500">Verify database connectivity and response time.</p>
        <button onClick={checkFirestore} type="button" className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700">Run check</button>
        {health ? (
          <div className={`mt-4 flex items-center gap-2 rounded-lg border p-3 text-sm ${health.ok ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-red-100 bg-red-50 text-red-600"}`}>
            {health.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            Firestore reachable — {health.latencyMs} ms
          </div>
        ) : null}
      </Card>

      <Card>
        <p className="text-sm font-semibold tracking-tight">Capacity Estimate</p>
        <p className="mt-0.5 text-xs text-neutral-500">Approximate Firestore usage from current data.</p>
        <div className="mt-4 space-y-2.5 text-sm">
          <CapacityRow label="User documents" value={stats?.totalUsers ?? 0} limit={100000} />
          <CapacityRow label="Site documents" value={stats?.totalSites ?? 0} limit={50000} />
          <CapacityRow label="Est. daily reads (scans)" value={stats?.totalScans ?? 0} limit={50000} />
          <CapacityRow label="Est. daily writes (clicks)" value={stats?.totalClicks ?? 0} limit={20000} />
        </div>
        <p className="mt-4 text-[0.65rem] leading-4 text-neutral-400">
          Estimates only. For exact usage and billing, check the Firebase console → Usage tab. Free tier: 50k reads / 20k writes / 20k deletes per day, 1 GiB storage.
        </p>
      </Card>

      <Card>
        <p className="text-sm font-semibold tracking-tight">Quick Links</p>
        <div className="mt-4 grid gap-2">
          {[
            { label: "Firebase Console — Firestore", url: "https://console.firebase.google.com/project/_/firestore" },
            { label: "Firebase Console — Usage & Billing", url: "https://console.firebase.google.com/project/_/usage" },
            { label: "Firebase Console — Authentication", url: "https://console.firebase.google.com/project/_/authentication/users" },
          ].map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-50">
              {l.label}<span aria-hidden>→</span>
            </a>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold tracking-tight">Data Export</p>
        <p className="mt-0.5 text-xs text-neutral-500">Export platform data as CSV from the Users tab.</p>
        <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-neutral-600">
          <li>Users export includes uid, name, email and role.</li>
          <li>Site data can be exported via Firebase console → Firestore → Export.</li>
          <li>Analytics events are append-only and safe to archive periodically.</li>
        </ul>
      </Card>
    </div>
  );
}

function CapacityRow({ label, value, limit }: { label: string; value: number; limit: number }) {
  const pct = Math.min(Math.round((value / limit) * 100), 100);
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-neutral-600">{label}</span>
        <span className="font-medium text-neutral-900">{value.toLocaleString()} <span className="font-normal text-neutral-400">/ {limit.toLocaleString()}</span></span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-neutral-100">
        <div className={`h-full rounded-full ${pct > 80 ? "bg-red-500" : pct > 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-500">{label}</p>
        <Icon className="h-4 w-4 text-neutral-300" />
      </div>
      <strong className="mt-1 block text-2xl font-semibold tracking-tight">{value.toLocaleString()}</strong>
    </Card>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${role === "admin" ? "bg-blue-50 text-blue-700" : "bg-neutral-100 text-neutral-500"}`}>
      {role === "admin" ? <ShieldCheck className="h-3 w-3" /> : null}{role}
    </span>
  );
}

function ActionButton({ onClick, label, icon: Icon, danger, title }: { onClick: () => void; label: string; icon?: React.ElementType; danger?: boolean; title?: string }) {
  return (
    <button onClick={onClick} type="button" title={title}
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition ${danger ? "border-red-200 text-red-600 hover:bg-red-50" : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"}`}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}{label}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) { return <section className="rounded-xl border border-neutral-200 bg-white p-5">{children}</section>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label className="text-xs font-medium text-neutral-600">{label}<input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100" /></label>; }

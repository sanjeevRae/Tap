"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CheckCircle2,
  Check,
  Clock,
  Coffee,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Link as LinkIcon,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Navigation,
  Plus,
  Phone,
  Send,
  Share2,
  Star,
  QrCode,
  Save,
  Settings,
  Trash2,
  Upload,
  User,
  Globe2,
} from "lucide-react";
import { onAuthStateChanged, signOut, updateProfile, type User as FirebaseUser } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { ensureUserProfile, getUserProfile, type UserProfile } from "@/lib/users";
import {
  completionForSite,
  directionsUrl,
  getOrCreateSite,
  mapEmbedUrl,
  platformUrl,
  publicUrlForCode,
  regenerateSiteQr,
  saveSite,
  type TapLink,
  type TapSite,
} from "@/lib/tapchitra";

type Section = "dashboard" | "links" | "qr" | "analytics" | "settings";

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "links", label: "Links", icon: LinkIcon },
  { id: "qr", label: "QR Code", icon: QrCode },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const cdn = "https://cdn.simpleicons.org";
const socialPresets = [
  { label: "Facebook", icon: `${cdn}/facebook/1877F2`, placeholder: "https://facebook.com/yourpage" },
  { label: "Instagram", icon: `${cdn}/instagram/E4405F`, placeholder: "https://instagram.com/yourhandle" },
  { label: "TikTok", icon: `${cdn}/tiktok/000000`, placeholder: "https://tiktok.com/@yourhandle" },
  { label: "YouTube", icon: `${cdn}/youtube/FF0000`, placeholder: "https://youtube.com/@yourchannel" },
  { label: "Website", icon: `${cdn}/googlechrome/4285F4`, placeholder: "https://yourwebsite.com" },
  { label: "WhatsApp", icon: `${cdn}/whatsapp/25D366`, placeholder: "https://wa.me/9779800000000" },
  { label: "LinkedIn", icon: `${cdn}/linkedin/0A66C2`, placeholder: "https://linkedin.com/company/yourbusiness" },
  { label: "Snapchat", icon: `${cdn}/snapchat/FFFC00`, placeholder: "https://snapchat.com/add/yourhandle" },
  { label: "Viber", icon: `${cdn}/viber/7360F2`, placeholder: "viber://chat?number=%2B9779800000000" },
  { label: "X", icon: `${cdn}/x/000000`, placeholder: "https://x.com/yourhandle" },
  { label: "Custom", icon: `${cdn}/linktree/43E55E`, placeholder: "https://" },
];

function socialPresetFor(label: string) {
  return socialPresets.find((preset) => preset.label.toLowerCase() === label.toLowerCase()) || socialPresets[socialPresets.length - 1];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [site, setSite] = React.useState<TapSite | null>(null);
  const [section, setSection] = React.useState<Section>("dashboard");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const currentSection = new URLSearchParams(window.location.search).get("section") as Section | null;
    if (currentSection && navItems.some((item) => item.id === currentSection)) {
      setSection(currentSection);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }
      try {
        const userProfile = (await getUserProfile(currentUser.uid)) ?? (await ensureUserProfile(currentUser));
        const activeSite = await getOrCreateSite(currentUser.uid, currentUser.email || "", userProfile.name);
        setUser(currentUser);
        setProfile(userProfile);
        setSite(activeSite);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data. Check Firebase configuration and rules.");
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [router]);

  function go(next: Section) {
    setSection(next);
    router.replace(`/dashboard?section=${next}`, { scroll: false });
  }

  async function persist(next = site, message = "Changes saved.") {
    if (!next) return;
    setSaving(true);
    setError("");
    try {
      await saveSite(next);
      setSite({ ...next });
      setNotice(message);
      setTimeout(() => setNotice(""), 2200);
    } catch (err) {
      console.error(err);
      setError("Save failed. Please check required fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function saveAccount(nextProfile: UserProfile, nextSite: TapSite) {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { ...nextProfile, updatedAt: new Date() });
      await updateProfile(user, { displayName: nextProfile.name, photoURL: nextProfile.photoURL || "" });
      await saveSite(nextSite);
      setProfile(nextProfile);
      setSite(nextSite);
      setNotice("Account updated.");
      setProfileOpen(false);
    } catch (err) {
      console.error(err);
      setError("Unable to update account.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (loading) return <DashboardShellSkeleton />;
  if (error && !site) return <main className="grid min-h-dvh place-items-center bg-[#f7f7fb] p-6 text-sm text-red-600">{error}</main>;
  if (!site || !profile) return null;

  const publicUrl = publicUrlForCode(site.qrCode);
  const completion = completionForSite(site);

  return (
    <main className="min-h-dvh bg-[#f7f7fb] pb-24 text-[#171421] md:pb-0">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/10 bg-white px-4 py-5 md:block">
        <div className="px-3 text-lg font-semibold">TapChitra</div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => <NavButton key={item.id} item={item} active={section === item.id} onClick={() => go(item.id)} />)}
        </nav>
      </aside>

      <section className="md:ml-64">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-black/10 bg-white/90 px-4 backdrop-blur md:h-16 md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" type="button" onClick={() => go("dashboard")} aria-label="Open dashboard"><Menu className="h-5 w-5" /></button>
            <h1 className="text-base font-semibold md:text-xl">{navItems.find((item) => item.id === section)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            {notice ? <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 sm:inline">{notice}</span> : null}
            <button className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white" type="button" aria-label="Notifications"><Bell className="h-4 w-4" /></button>
            <button onClick={() => setProfileOpen(true)} className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-black/10 bg-white" type="button" aria-label="Account profile">
              {profile.photoURL || site.business.logo ? <img src={profile.photoURL || site.business.logo} alt="" className="h-full w-full object-cover" /> : <User className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-5 p-4 md:p-8">
          {error ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
          {section === "dashboard" ? <DashboardHome site={site} setSite={setSite} completion={completion} publicUrl={publicUrl} go={go} persist={persist} /> : null}
          {section === "links" ? <LinksPanel site={site} setSite={setSite} persist={persist} /> : null}
          {section === "qr" ? <QrPanel site={site} setSite={setSite} publicUrl={publicUrl} persist={persist} /> : null}
          {section === "analytics" ? <AnalyticsPanel site={site} /> : null}
          {section === "settings" ? <SettingsPanel site={site} setSite={setSite} persist={persist} logout={logout} /> : null}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-black/10 bg-white px-2 pb-2 pt-1 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} type="button" onClick={() => go(item.id)} className={`grid min-h-14 place-items-center gap-1 text-[0.68rem] ${section === item.id ? "text-[#6544e8]" : "text-[#6f6b7c]"}`}>
              <Icon className="h-5 w-5" />
              <span>{item.label === "Dashboard" ? "Home" : item.label}</span>
            </button>
          );
        })}
      </nav>

      {profileOpen ? <AccountDialog profile={profile} site={site} saving={saving} onClose={() => setProfileOpen(false)} onSave={saveAccount} /> : null}
    </main>
  );
}

function NavButton({ item, active, onClick }: { item: { label: string; icon: React.ElementType }; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? "bg-[#f0edff] text-[#5633d7]" : "text-[#696575] hover:bg-black/[0.03]"}`}><Icon className="h-4 w-4" />{item.label}</button>;
}

function DashboardHome({ site, setSite, completion, publicUrl, go, persist }: any) {
  return (
    <>
      <section className="rounded-lg bg-gradient-to-br from-[#865cff] to-[#4f2ed7] p-4 text-white shadow-[0_18px_35px_rgba(93,62,210,0.28)]">
        <div className="flex items-start gap-4">
          <LogoCircle src={site.business.logo} name={site.business.name} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3"><h2 className="truncate text-lg font-semibold">{site.business.name}</h2><span className="rounded-full bg-emerald-400/25 px-3 py-1 text-xs font-semibold text-emerald-100">Active</span></div>
            <p className="mt-2 truncate text-sm text-white/85">{new URL(publicUrl).hostname}{site.publicPath}</p>
            <div className="mt-5 flex gap-2"><button onClick={() => window.open(publicUrl, "_blank")} className="rounded-md border border-white/35 px-5 py-2 text-sm font-semibold" type="button">View Page</button><button onClick={() => navigator.clipboard.writeText(publicUrl)} className="grid h-10 w-10 place-items-center rounded-md border border-white/35" aria-label="Copy public URL" type="button"><Copy className="h-4 w-4" /></button></div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card><div className="flex items-start justify-between"><div><p className="text-sm font-semibold">Total Scans</p><div className="mt-5 flex items-end gap-3"><strong className="text-3xl">{site.analytics.scans.toLocaleString()}</strong><span className="mb-1 text-xs font-semibold text-emerald-600">↑ 18.6%</span></div><p className="mt-1 text-xs text-[#767184]">vs last month</p></div><select className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs"><option>This Month</option><option>All Time</option></select></div><MiniChart values={site.analytics.dailyScans} /></Card>
        <Card><p className="text-sm font-semibold">Quick Actions</p><div className="mt-4 grid grid-cols-4 gap-3">{[{id:"dashboard",label:"Edit Profile",icon:User},{id:"links",label:"Manage Links",icon:LinkIcon},{id:"qr",label:"QR Code",icon:QrCode},{id:"analytics",label:"Analytics",icon:BarChart3}].map((a:any)=><button key={a.label} onClick={()=>go(a.id)} className="grid min-h-20 place-items-center rounded-lg border border-black/10 bg-white text-center text-[0.7rem] text-[#3c354f]" type="button"><a.icon className="h-5 w-5 text-[#6544e8]" />{a.label}</button>)}</div></Card>
      </section>

      <Card><div className="flex justify-between text-sm font-semibold"><span>Profile Completion</span><span className="text-[#6544e8]">{completion}%</span></div><div className="mt-3 h-2 rounded-full bg-[#ece8fb]"><div className="h-full rounded-full bg-[#6544e8]" style={{ width: `${completion}%` }} /></div></Card>
      <ProfileEditor site={site} setSite={setSite} persist={persist} />
      <PagePreview site={site} publicUrl={publicUrl} />
    </>
  );
}

function ProfileEditor({ site, setSite, persist }: any) {
  function update(field: string, value: string | string[]) { setSite({ ...site, business: { ...site.business, [field]: value } }); }
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div><p className="text-sm font-semibold">Edit Profile</p><p className="text-xs text-[#767184]">Draft changes show in preview and publish to the QR page when saved.</p></div>
        <button onClick={() => persist()} className="rounded-md bg-[#6544e8] px-4 py-2 text-sm font-semibold text-white" type="button"><Save className="mr-2 inline h-4 w-4" />Save</button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {["name","description","phone","email","address","openingHours","googleReviewUrl","locationLabel","googleRating","googleReviewCount"].map((field)=><label key={field} className="text-xs font-medium capitalize text-[#595366]">{field.replace(/([A-Z])/g," $1")}<input value={site.business[field] || ""} onChange={(e)=>update(field,e.target.value)} className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-[#6544e8]" placeholder={field === "googleReviewUrl" ? "Paste your Google review link" : undefined} /></label>)}
      </div>
      <label className="mt-3 block text-xs font-medium text-[#595366]">Category tags<input value={(site.business.categoryTags || []).join(", ")} onChange={(e)=>update("categoryTags", e.target.value.split(",").map((item)=>item.trim()).filter(Boolean))} className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-[#6544e8]" placeholder="Cafe, Restaurant, Coffee Shop" /></label>
      <div className="mt-4 rounded-lg border border-black/10 p-3">
        <p className="text-sm font-semibold">Map Location</p>
        <p className="mt-1 text-xs text-[#767184]">
          The public map is generated from the business address.
        </p>
        {site.business.address ? <iframe title="Address map preview" src={mapEmbedUrl(site)} className="mt-3 h-44 w-full rounded-md border-0" loading="lazy" /> : null}
      </div>
      <ImageInput label="Logo" value={site.business.logo} onChange={(v)=>update("logo",v)} />
      <ImageInput label="Cover image" value={site.business.coverImage} onChange={(v)=>update("coverImage",v)} />
    </Card>
  );
}

function LinksPanel({ site, setSite, persist }: any) {
  const updateLinks = (links: TapLink[]) => setSite({ ...site, links });
  const add = (preset = socialPresets[0]) => updateLinks([...site.links, { id: crypto.randomUUID(), label: preset.label, url: preset.placeholder, enabled: true, order: site.links.length, clicks: 0 }]);
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Social Media</p>
          <p className="text-xs text-[#767184]">Add the channels customers should open from your TapChitra page.</p>
        </div>
        <select onChange={(event)=>add(socialPresets.find((item)=>item.label===event.target.value) || socialPresets[0])} defaultValue="" className="h-10 rounded-md border border-black/10 bg-white px-3 text-sm">
          <option value="" disabled>Add link</option>
          {socialPresets.map((preset)=><option key={preset.label} value={preset.label}>{preset.label}</option>)}
        </select>
      </div>
      <div className="mt-5 space-y-3">
        {site.links.map((link: TapLink, index: number) => {
          const preset = socialPresetFor(link.label);
          return (
            <div key={link.id} className="rounded-lg border border-black/5 bg-white p-3 shadow-[0_10px_24px_rgba(34,28,54,0.06)]">
              <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#f7f7fb]">
                  <img src={preset.icon} alt="" className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <input value={link.label} onChange={(e)=>updateLinks(site.links.map((l:TapLink)=>l.id===link.id?{...l,label:e.target.value}:l))} className="h-6 w-full bg-transparent text-sm font-semibold outline-none" />
                  <input value={link.url} onChange={(e)=>updateLinks(site.links.map((l:TapLink)=>l.id===link.id?{...l,url:e.target.value}:l))} className="h-6 w-full bg-transparent text-xs text-[#767184] outline-none" placeholder={preset.placeholder} />
                </div>
                <button onClick={()=>updateLinks(site.links.map((l:TapLink)=>l.id===link.id?{...l,enabled:!l.enabled}:l))} className={`rounded-full px-3 py-1 text-xs ${link.enabled?"bg-emerald-50 text-emerald-700":"bg-black/5 text-[#777]"}`} type="button">{link.enabled?"On":"Off"}</button>
              </div>
              <div className="mt-3 flex justify-end gap-1 border-t border-black/5 pt-2">
                <IconButton onClick={()=>index>0&&updateLinks(move(site.links,index,index-1))} icon={ArrowUp} label="Move up" />
                <IconButton onClick={()=>index<site.links.length-1&&updateLinks(move(site.links,index,index+1))} icon={ArrowDown} label="Move down" />
                <IconButton onClick={()=>updateLinks(site.links.filter((l:TapLink)=>l.id!==link.id))} icon={Trash2} label="Delete" />
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>persist()} className="mt-6 h-12 w-full rounded-md bg-[#6544e8] px-4 text-sm font-semibold text-white" type="button">Save Changes</button>
    </Card>
  );
}

function QrPanel({ site, setSite, publicUrl }: any) {
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(publicUrl)}`;
  async function regen() { const code = await regenerateSiteQr(site); setSite({ ...site, qrCode: code, publicPath: `/t/${code}` }); }
  return <Card><p className="text-sm font-semibold">QR Code</p><p className="mt-1 text-xs text-[#767184]">Stable resolver URL. Do not replace this with a custom domain URL.</p><div className="mt-5 grid gap-5 md:grid-cols-[20rem_1fr]"><div className="grid place-items-center rounded-lg border border-black/10 bg-white p-6"><img src={qrImage} alt="QR code" className="h-64 w-64" /></div><div className="space-y-3"><input readOnly value={publicUrl} className="h-11 w-full rounded-md border border-black/10 px-3 text-sm" /><button onClick={()=>navigator.clipboard.writeText(publicUrl)} className="w-full rounded-md border border-black/10 py-2 text-sm" type="button"><Copy className="mr-2 inline h-4 w-4" />Copy URL</button><a href={qrImage} download={`tapchitra-${site.qrCode}.png`} className="block rounded-md border border-black/10 py-2 text-center text-sm"><Download className="mr-2 inline h-4 w-4" />Download QR</a><button onClick={regen} className="w-full rounded-md bg-[#6544e8] py-2 text-sm font-semibold text-white" type="button">Regenerate QR</button><button onClick={()=>window.open(publicUrl,"_blank")} className="w-full rounded-md bg-[#171421] py-2 text-sm font-semibold text-white" type="button"><ExternalLink className="mr-2 inline h-4 w-4" />Open Public Page</button></div></div></Card>;
}

function AnalyticsPanel({ site }: { site: TapSite }) {
  const clicks = site.links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-3"><Stat label="Scans" value={site.analytics.scans} /><Stat label="Link Clicks" value={site.analytics.linkClicks || clicks} /><Stat label="Active Links" value={site.links.filter(l=>l.enabled).length} /></div><Card><p className="text-sm font-semibold">Scan Trend</p>{site.analytics.scans || site.analytics.dailyScans.length ? <MiniChart values={site.analytics.dailyScans} tall /> : <EmptyState text="No scans yet. Share or print your QR code to start collecting analytics." />}</Card><Card><p className="text-sm font-semibold">Link Performance</p><div className="mt-4 space-y-2">{site.links.map(link=><div key={link.id} className="flex justify-between rounded-md bg-black/[0.03] px-3 py-2 text-sm"><span>{link.label}</span><span>{link.clicks || 0} clicks</span></div>)}</div></Card></div>;
}

function SettingsPanel({ site, setSite, persist, logout }: any) {
  const updateSetting = (key: string, value: any) => setSite({ ...site, settings: { ...site.settings, [key]: value } });
  return <Card><p className="text-sm font-semibold">Settings</p><div className="mt-4 grid gap-4 md:grid-cols-2"><label className="text-sm">Public page color<input type="color" value={site.settings.accentColor} onChange={(e)=>updateSetting("accentColor",e.target.value)} className="mt-2 block h-11 w-full rounded-md border border-black/10" /></label>{["showAddress","showPhone","notifications"].map(key=><label key={key} className="flex items-center justify-between rounded-lg border border-black/10 p-3 text-sm capitalize">{key.replace(/([A-Z])/g," $1")}<input type="checkbox" checked={site.settings[key]} onChange={(e)=>updateSetting(key,e.target.checked)} /></label>)}</div><div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>persist()} className="rounded-md bg-[#6544e8] px-4 py-2 text-sm font-semibold text-white" type="button"><Check className="mr-2 inline h-4 w-4" />Save Settings</button><button onClick={logout} className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600" type="button"><LogOut className="mr-2 inline h-4 w-4" />Log out</button></div></Card>;
}

function AccountDialog({ profile, site, saving, onClose, onSave }: any) {
  const [draftProfile, setDraftProfile] = React.useState(profile);
  const [draftSite, setDraftSite] = React.useState(site);
  return <div className="fixed inset-0 z-50 grid place-items-end bg-black/30 p-0 md:place-items-center md:p-6"><div className="max-h-[92dvh] w-full overflow-auto rounded-t-xl bg-white p-5 shadow-xl md:max-w-xl md:rounded-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Account Profile</h2><button onClick={onClose} type="button">Close</button></div><div className="mt-4 flex items-center gap-4"><LogoCircle src={draftProfile.photoURL || draftSite.business.logo} name={draftProfile.name} /><ImageInput label="Profile image" value={draftProfile.photoURL || ""} onChange={(v)=>setDraftProfile({...draftProfile,photoURL:v})} compact /></div><div className="mt-4 grid gap-3"><Field label="Name" value={draftProfile.name} onChange={(v:string)=>setDraftProfile({...draftProfile,name:v})} /><Field label="Email" value={draftProfile.email} onChange={(v:string)=>setDraftProfile({...draftProfile,email:v})} /><Field label="Business name" value={draftSite.business.name} onChange={(v:string)=>setDraftSite({...draftSite,business:{...draftSite.business,name:v}})} /><Field label="Business email" value={draftSite.business.email} onChange={(v:string)=>setDraftSite({...draftSite,business:{...draftSite.business,email:v}})} /></div><button disabled={saving} onClick={()=>onSave(draftProfile,draftSite)} className="mt-5 w-full rounded-md bg-[#6544e8] py-3 text-sm font-semibold text-white disabled:opacity-60" type="button">{saving ? "Saving..." : "Save Changes"}</button></div></div>;
}

function PagePreview({ site, publicUrl }: { site: TapSite; publicUrl: string }) { return <Card><div className="flex justify-between"><div><p className="text-sm font-semibold">Your Page Preview</p><p className="text-xs text-[#767184]">See how your customers see your full public page</p></div><button onClick={()=>window.open(publicUrl,"_blank")} type="button" aria-label="Open preview"><Eye className="h-4 w-4" /></button></div><div className="mt-4 overflow-hidden rounded-lg border border-black/10"><PublicMock site={site} /></div></Card>; }
function PublicMock({ site }: { site: TapSite }) {
  const enabledLinks = site.links.filter((link) => link.enabled && link.url);
  const embedUrl = mapEmbedUrl(site);
  const routeUrl = directionsUrl(site);
  const whatsapp = enabledLinks.find((link) => link.label.toLowerCase() === "whatsapp");
  const website = enabledLinks.find((link) => link.label.toLowerCase() === "website");
  return (
    <div className="bg-[#fffaf4]">
      <div className="relative h-48 bg-[#171421] bg-cover bg-center" style={{backgroundImage: site.business.coverImage ? `url(${site.business.coverImage})` : undefined}}>
        <button className="absolute right-3 top-3 flex h-9 items-center gap-2 rounded-full border border-white/70 bg-black/25 px-3 text-xs font-semibold text-white" type="button"><ExternalLink className="h-4 w-4" />Share</button>
      </div>
      <div className="rounded-t-[1.5rem] bg-[#fffaf4] px-4 pb-5 text-center">
        <div className="-mt-16">
          <div className="mx-auto grid h-32 w-32 place-items-center overflow-hidden rounded-full border-[5px] border-white bg-[#5a2b12] text-xl font-semibold text-white shadow-lg">
            {site.business.logo ? <img src={site.business.logo} alt="" className="h-full w-full object-cover" /> : null}
          </div>
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight">{site.business.name}</h3>
        {site.business.description ? <p className="mt-2 text-sm leading-5 text-[#171421]">{site.business.description}</p> : null}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Cafe", "Restaurant", "Coffee Shop"].map((chip) => <span key={chip} className="rounded-full bg-black/[0.05] px-4 py-2 text-xs">{chip}</span>)}
        </div>
        <div className="mt-5 grid grid-cols-3 divide-x divide-black/10 text-left text-xs">
          <div className="px-2"><p className="font-semibold"><span className="text-amber-500">★</span> 4.8 <span className="font-normal text-[#767184]">(125)</span></p><p className="mt-1 text-[#767184]">Google Rating</p></div>
          <div className="px-2"><p className="flex items-center gap-1 font-semibold"><Clock className="h-4 w-4 text-amber-600" />Open Now</p><p className="mt-1 text-[#767184]">{site.business.openingHours || "10:00 AM - 10:00 PM"}</p></div>
          <div className="px-2"><p className="flex items-center gap-1 font-semibold"><MapPin className="h-4 w-4 text-amber-600" />Location</p><p className="mt-1 truncate text-[#767184]">{site.business.address || "Add address"}</p></div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {site.settings.showPhone && site.business.phone ? <ActionTile dark icon={Phone} label="Call" /> : null}
          {whatsapp ? <ActionTile dark icon={MessageSquare} label="WhatsApp" /> : null}
          {routeUrl ? <ActionTile icon={Send} label="Directions" /> : null}
          {website ? <ActionTile icon={ExternalLink} label="Website" /> : null}
        </div>
        <div className="mt-6 text-left">
          <h4 className="text-lg font-bold">Find Us</h4>
          {site.business.address ? <p className="mt-3 flex items-center gap-2 text-sm text-[#3f3948]"><MapPin className="h-4 w-4" />{site.business.address}</p> : null}
          {embedUrl ? <iframe title="Business location preview" src={embedUrl} className="mt-4 h-64 w-full rounded-xl border-0" loading="lazy" /> : null}
          {routeUrl ? <button className="mt-3 rounded-md bg-white px-3 py-2 text-xs font-semibold text-[#2b7de9]" type="button">Open in Maps <ExternalLink className="ml-1 inline h-3 w-3" /></button> : null}
        </div>
        {site.business.googleReviewUrl ? <button className="mt-5 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700" type="button"><MessageSquare className="mr-1 inline h-4 w-4" />Leave a Google Review</button> : null}
      </div>
    </div>
  );
}
function ActionTile({ icon: Icon, label, dark }: { icon: React.ElementType; label: string; dark?: boolean }) {
  return <button className={`grid aspect-square place-items-center rounded-xl text-xs font-semibold ${dark ? "bg-[#5a2b12] text-white" : "bg-black/[0.05] text-[#171421]"}`} type="button"><Icon className="h-6 w-6" /><span>{label}</span></button>;
}
function Card({ children }: { children: React.ReactNode }) { return <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(34,28,54,0.06)]">{children}</section>; }
function LogoCircle({ src, name, large }: { src?: string; name: string; large?: boolean }) { return <div className={`${large?"mx-auto h-16 w-16":"h-16 w-16"} shrink-0 overflow-hidden rounded-full border-4 border-white/45 bg-[#2a233a] text-white grid place-items-center font-semibold`}>{src ? <img src={src} alt="" className="h-full w-full object-cover" /> : name.slice(0,2).toUpperCase()}</div>; }
function MiniChart({ values, tall }: { values: number[]; tall?: boolean }) { const max = Math.max(...values, 1); const points = values.map((v,i)=>`${(i/(values.length-1 || 1))*100},${60-(v/max)*50}`).join(" "); return <svg viewBox="0 0 100 64" className={`mt-4 w-full ${tall?"h-56":"h-24"}`}><polyline points={points} fill="none" stroke="#6544e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Stat({ label, value }: { label: string; value: number }) { return <Card><p className="text-xs text-[#767184]">{label}</p><strong className="mt-2 block text-2xl">{value.toLocaleString()}</strong></Card>; }
function EmptyState({ text }: { text: string }) { return <div className="mt-4 rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-[#767184]">{text}</div>; }
function IconButton({ icon: Icon, label, onClick }: any) { return <button onClick={onClick} className="grid h-10 w-10 place-items-center rounded-md border border-black/10" type="button" aria-label={label}><Icon className="h-4 w-4" /></button>; }
function move<T>(items: T[], from: number, to: number) { const copy = [...items]; const [item] = copy.splice(from,1); copy.splice(to,0,item); return copy; }
function Field({ label, value, onChange }: any) { return <label className="text-xs font-medium text-[#595366]">{label}<input value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 text-sm" /></label>; }
async function uploadImageToCloudinary(file: File) {
  const signatureRes = await fetch("/api/media/direct-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folder: "tapchitra",
      tags: "tapchitra,dashboard",
    }),
  });

  const signatureData = await signatureRes.json().catch(() => ({}));
  if (!signatureRes.ok) {
    throw new Error(signatureData.error || "Unable to prepare image upload.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", String(signatureData.timestamp));
  formData.append("signature", signatureData.signature);

  Object.entries(signatureData.params || {}).forEach(([key, value]) => {
    if (key !== "timestamp" && typeof value === "string") {
      formData.append(key, value);
    }
  });

  const uploadRes = await fetch(signatureData.uploadUrl, {
    method: "POST",
    body: formData,
  });
  const uploadData = await uploadRes.json().catch(() => ({}));

  if (!uploadRes.ok || !uploadData.secure_url) {
    throw new Error(uploadData.error?.message || "Image upload failed.");
  }

  return String(uploadData.secure_url);
}

function ImageInput({ label, onChange, compact }: any) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <span className={`${compact ? "" : "mt-3"} inline-flex flex-col items-start gap-2`}>
      <label className={`inline-flex cursor-pointer items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm ${uploading ? "pointer-events-none opacity-60" : ""}`}>
        <Upload className="h-4 w-4" />
        {uploading ? "Uploading..." : label}
        <input type="file" accept="image/*" className="hidden" onChange={(e)=>handleFile(e.target.files?.[0])} />
      </label>
      {error ? <span className="max-w-xs text-xs text-red-600">{error}</span> : null}
    </span>
  );
}
function DashboardShellSkeleton() { return <main className="min-h-dvh bg-[#f7f7fb] p-4 md:ml-64 md:p-8"><div className="mx-auto max-w-6xl space-y-4"><div className="h-44 animate-pulse rounded-lg bg-black/10" /><div className="h-32 animate-pulse rounded-lg bg-black/10" /><div className="h-80 animate-pulse rounded-lg bg-black/10" /></div></main>; }

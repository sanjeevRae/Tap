"use client";

import * as React from "react";
import { CheckCircle2, Clock, ExternalLink, Globe2, MapPin, MessageSquare, Navigation, Phone, Share2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { directionsUrl, mapEmbedUrl, recordLinkClick, recordScan, resolveSiteByQr, type TapSite } from "@/lib/tapchitra";

const cdn = "https://cdn.simpleicons.org";
const socialIcons: Record<string, string> = {
  facebook: `${cdn}/facebook/1877F2`,
  instagram: `${cdn}/instagram/E4405F`,
  tiktok: `${cdn}/tiktok/000000`,
  youtube: `${cdn}/youtube/FF0000`,
  website: `${cdn}/googlechrome/4285F4`,
  whatsapp: `${cdn}/whatsapp/25D366`,
  linkedin: "https://s.magecdn.com/social/tc-linkedin.svg",
  snapchat: `${cdn}/snapchat/FFFC00`,
  viber: `${cdn}/viber/7360F2`,
  x: `${cdn}/x/000000`,
};

function socialIconFor(label: string) {
  return socialIcons[label.toLowerCase()] || `${cdn}/linktree/43E55E`;
}

export default function PublicQrPage() {
  const params = useParams<{ code: string }>();
  const [site, setSite] = React.useState<TapSite | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    resolveSiteByQr(params.code)
      .then(async (resolved) => {
        if (!active) return;
        setSite(resolved);
        if (resolved?.status === "active") await recordScan(resolved);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [params.code]);

  if (loading) return <main className="min-h-dvh bg-[#f7f7fb]" />;
  if (!site || site.status !== "active") return <main className="grid min-h-dvh place-items-center bg-[#f7f7fb] p-6 text-center text-sm text-[#676171]">This TapChitra page is unavailable.</main>;

  async function openLink(linkId: string, url: string) {
    if (!site) return;
    await recordLinkClick(site, linkId);
    window.location.href = url.startsWith("http") ? url : `https://${url}`;
  }

  const embedUrl = mapEmbedUrl(site);
  const routeUrl = directionsUrl(site);
  const enabledLinks = site.links.filter((link) => link.enabled && link.url);
  const whatsapp = enabledLinks.find((link) => link.label.toLowerCase() === "whatsapp");
  const website = enabledLinks.find((link) => link.label.toLowerCase() === "website");
  const categoryTags = (site.business.categoryTags || []).filter(Boolean).slice(0, 4);
  const hasRating = site.business.googleRating || site.business.googleReviewCount;
  const locationLabel = site.business.locationLabel || site.business.address.split(",")[0] || "";
  const dark = site.settings.theme === "dark";
  const accent = !site.settings.accentColor || site.settings.accentColor === "#6544e8" ? "#5a2b12" : site.settings.accentColor;
  const muted = dark ? "text-[#9b97a6]" : "text-[#6e6973]";

  return (
    <main className={`min-h-dvh ${dark ? "bg-[#0f0e13] text-[#f2f1f5]" : "bg-[#f5f6f8] text-[#15131a]"}`}>
      <section className={`mx-auto min-h-dvh max-w-md overflow-hidden shadow-sm ${dark ? "bg-[#171421]" : "bg-white"}`}>
        <div
          className="relative h-[208px] bg-[#1d120c] bg-cover bg-center"
          style={{ backgroundImage: site.business.coverImage ? `linear-gradient(to bottom, rgba(0,0,0,.18), rgba(0,0,0,.12)), url(${site.business.coverImage})` : undefined }}
        >
          <button className="absolute right-2.5 top-8 flex h-10 items-center gap-2 rounded-full border border-white/80 bg-black/25 px-4 text-sm font-semibold text-white backdrop-blur-sm" type="button" onClick={() => navigator.share?.({ title: site.business.name, url: location.href })}>
            <Share2 className="h-4 w-4" />Share
          </button>
        </div>
        <div className={`relative mt-0 rounded-t-[1.45rem] px-5 pb-8 pt-[58px] text-center ${dark ? "bg-[#171421] shadow-[0_-14px_36px_rgba(0,0,0,0.4)]" : "bg-white shadow-[0_-14px_36px_rgba(16,18,26,0.08)]"}`}>
          <div className="absolute left-1/2 top-0 grid h-[142px] w-[142px] -translate-x-1/2 -translate-y-[72px] place-items-center overflow-hidden rounded-full border-[5px] border-white text-center text-xl font-semibold text-white shadow-[0_10px_26px_rgba(45,23,10,.28)]" style={{ backgroundColor: accent }}>
            {site.business.logo ? (
              <img src={site.business.logo} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <h1 className="mt-5 flex items-center justify-center gap-2 text-[29px] font-extrabold tracking-normal">
            <span className="truncate">{site.business.name}</span>
            <CheckCircle2 className="h-6 w-6 shrink-0 fill-[#3478f6] text-white" />
          </h1>
          {site.business.description ? <p className={`mt-1.5 text-base leading-6 ${dark ? "text-[#c9c6d1]" : "text-[#15131a]"}`}>{site.business.description}</p> : null}
          {categoryTags.length ? (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {categoryTags.map((chip) => <span key={chip} className={`rounded-full px-4 py-1.5 text-xs font-medium ${dark ? "bg-white/10 text-[#d7d4de]" : "bg-[#f3f4f6]"}`}>{chip}</span>)}
            </div>
          ) : null}
          <div className={`mt-8 grid grid-cols-3 divide-x text-left text-xs ${dark ? "divide-[#2a2733]" : "divide-[#e5e7eb]"}`}>
            <div className="px-1.5">
              <p className="flex items-center gap-1 font-bold"><Star className="h-4 w-4 fill-[#f5b51b] text-[#f5b51b]" />{hasRating ? site.business.googleRating || "Rating" : "Review" } {site.business.googleReviewCount ? <span className="font-normal text-[#6e6973]">({site.business.googleReviewCount})</span> : null}</p>
              <p className={`mt-1.5 ${muted}`}>Google Rating</p>
            </div>
            <div className="px-3">
              <p className="flex items-center gap-1 font-bold"><Clock className="h-4 w-4 text-[#c98524]" />Open Now</p>
              <p className={`mt-1.5 ${muted}`}>{site.business.openingHours || "10:00 AM - 10:00 PM"}</p>
            </div>
            <div className="px-3">
              <p className="flex items-center gap-1 font-bold"><MapPin className="h-4 w-4 text-[#c98524]" />{locationLabel || "Location"}</p>
              <p className={`mt-1.5 truncate ${muted}`}>{site.business.address || "Add address"}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2.5">
            {site.settings.showPhone && site.business.phone ? <ActionTile dark={dark} icon={Phone} label="Call" onClick={() => location.href = `tel:${site.business.phone}`} /> : null}
            {whatsapp ? <ActionTile dark={dark} icon={MessageSquare} label="WhatsApp" onClick={() => openLink(whatsapp.id, whatsapp.url)} /> : null}
            {routeUrl ? <ActionTile dark={dark} icon={Navigation} label="Directions" onClick={() => openLink("directions", routeUrl)} /> : null}
            {website ? <ActionTile dark={dark} icon={Globe2} label="Website" onClick={() => openLink(website.id, website.url)} /> : null}
          </div>
          <section className={`-mx-5 mt-5 border-t px-5 pt-4 text-left ${dark ? "border-[#2a2733] bg-[#1c1926]" : "border-[#eef0f3] bg-[#fafbfc]"}`}>
            <h2 className="text-lg font-bold">Find Us</h2>
            {site.settings.showAddress && site.business.address ? <p className={`mt-4 flex items-start gap-2 text-sm font-medium ${dark ? "text-[#c9c6d1]" : "text-[#3f3948]"}`}><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{site.business.address}</p> : null}
            {embedUrl ? (
              <div className={`relative mt-5 overflow-hidden rounded-xl border ${dark ? "border-[#2a2733] bg-[#1c1926]" : "border-[#eef0f3] bg-white"}`}>
                {routeUrl ? <button onClick={() => openLink("directions", routeUrl)} className="absolute left-3 top-3 z-10 rounded-sm bg-white px-3 py-2 text-sm font-bold text-[#2b7de9] shadow" type="button">Open in Maps <ExternalLink className="ml-1 inline h-3 w-3" /></button> : null}
                <iframe title={`${site.business.name} location`} src={embedUrl} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </section>
          {site.business.googleReviewUrl ? <button onClick={() => openLink("google-review", site.business.googleReviewUrl)} className={`mt-5 w-full rounded-xl border px-3 py-3 text-sm font-semibold ${dark ? "border-amber-300/30 bg-amber-400/10 text-amber-300" : "border-amber-200 bg-amber-50 text-amber-700"}`} type="button"><MessageSquare className="mr-1 inline h-4 w-4" />Leave a Google Review</button> : null}
          <section className="mt-5 grid gap-3">
            {enabledLinks.filter((link) => !["whatsapp", "website"].includes(link.label.toLowerCase())).map((link) => <button key={link.id} onClick={() => openLink(link.id, link.url)} className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-semibold shadow-[0_1px_2px_rgba(16,18,26,0.05)] transition ${dark ? "border-[#2a2733] bg-[#1c1926] text-[#f2f1f5] hover:border-[#4a4656] hover:bg-[#221e2c]" : "border-[#e4e7ec] bg-white text-[#171421] hover:border-[#cfd3da] hover:bg-[#f7f8fa]"}`} type="button"><span className="flex min-w-0 items-center gap-3"><img src={socialIconFor(link.label)} alt="" className="h-6 w-6 shrink-0" /><span className="min-w-0"><span className="block truncate">{link.label}</span><span className={`block truncate text-xs font-normal ${muted}`}>{link.url}</span></span></span><ExternalLink className={`h-4 w-4 shrink-0 ${muted}`} /></button>)}
          </section>
        </div>
      </section>
    </main>
  );
}

function ActionTile({ icon: Icon, label, dark, onClick }: { icon: React.ElementType; label: string; dark?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group flex min-w-0 flex-col items-center gap-1.5 rounded-lg border py-3 shadow-[0_1px_2px_rgba(16,18,26,0.06)] transition duration-150 hover:shadow-[0_2px_8px_rgba(16,18,26,0.08)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f3948]/30 focus-visible:ring-offset-2 ${dark ? "border-[#2a2733] bg-[#1c1926] text-[#f2f1f5] hover:border-[#4a4656] hover:bg-[#221e2c]" : "border-[#e4e7ec] bg-white text-[#171421] hover:border-[#cfd3da] hover:bg-[#f7f8fa]"}`}
      type="button"
    >
      <Icon className="h-5 w-5" />
      {label ? <span className="max-w-full truncate px-1 text-[0.7rem] font-semibold">{label}</span> : null}
    </button>
  );
}

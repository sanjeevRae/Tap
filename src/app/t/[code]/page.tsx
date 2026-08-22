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

  return (
    <main className="min-h-dvh bg-[#f4f1ec] text-[#15131a]">
      <section className="mx-auto min-h-dvh max-w-md overflow-hidden bg-[#fffaf4] shadow-sm">
        <div
          className="relative h-[208px] bg-[#1d120c] bg-cover bg-center"
          style={{ backgroundImage: site.business.coverImage ? `linear-gradient(to bottom, rgba(0,0,0,.18), rgba(0,0,0,.12)), url(${site.business.coverImage})` : undefined }}
        >
          <button className="absolute right-2.5 top-8 flex h-10 items-center gap-2 rounded-full border border-white/80 bg-black/25 px-4 text-sm font-semibold text-white backdrop-blur-sm" type="button" onClick={() => navigator.share?.({ title: site.business.name, url: location.href })}>
            <Share2 className="h-4 w-4" />Share
          </button>
        </div>
        <div className="relative mt-0 rounded-t-[1.45rem] bg-[#fffaf4] px-5 pb-8 pt-[58px] text-center shadow-[0_-18px_42px_rgba(255,250,244,.92)]">
          <div className="absolute left-1/2 top-0 grid h-[142px] w-[142px] -translate-x-1/2 -translate-y-[72px] place-items-center overflow-hidden rounded-full border-[5px] border-white bg-[#5a2b12] text-center text-xl font-semibold text-white shadow-[0_10px_26px_rgba(45,23,10,.28)]">
            {site.business.logo ? (
              <img src={site.business.logo} alt="" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <h1 className="mt-5 flex items-center justify-center gap-2 text-[29px] font-extrabold tracking-normal">
            <span className="truncate">{site.business.name}</span>
            <CheckCircle2 className="h-6 w-6 shrink-0 fill-[#3478f6] text-white" />
          </h1>
          {site.business.description ? <p className="mt-1.5 text-base leading-6 text-[#15131a]">{site.business.description}</p> : null}
          {categoryTags.length ? (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {categoryTags.map((chip) => <span key={chip} className="rounded-full bg-[#f2eee7] px-4 py-1.5 text-xs font-medium">{chip}</span>)}
            </div>
          ) : null}
          <div className="mt-8 grid grid-cols-3 divide-x divide-[#d9d1c8] text-left text-xs">
            <div className="px-1.5">
              <p className="flex items-center gap-1 font-bold"><Star className="h-4 w-4 fill-[#f5b51b] text-[#f5b51b]" />{hasRating ? site.business.googleRating || "Rating" : "Review" } {site.business.googleReviewCount ? <span className="font-normal text-[#6e6973]">({site.business.googleReviewCount})</span> : null}</p>
              <p className="mt-1.5 text-[#6e6973]">Google Rating</p>
            </div>
            <div className="px-3">
              <p className="flex items-center gap-1 font-bold"><Clock className="h-4 w-4 text-[#c98524]" />Open Now</p>
              <p className="mt-1.5 text-[#6e6973]">{site.business.openingHours || "10:00 AM - 10:00 PM"}</p>
            </div>
            <div className="px-3">
              <p className="flex items-center gap-1 font-bold"><MapPin className="h-4 w-4 text-[#c98524]" />{locationLabel || "Location"}</p>
              <p className="mt-1.5 truncate text-[#6e6973]">{site.business.address || "Add address"}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2.5">
            {site.settings.showPhone && site.business.phone ? <ActionTile dark icon={Phone} label="Call" onClick={() => location.href = `tel:${site.business.phone}`} /> : null}
            {whatsapp ? <ActionTile dark icon={MessageSquare} label="WhatsApp" onClick={() => openLink(whatsapp.id, whatsapp.url)} /> : null}
            {routeUrl ? <ActionTile icon={Navigation} label="Directions" onClick={() => openLink("directions", routeUrl)} /> : null}
            {website ? <ActionTile icon={Globe2} label="Website" onClick={() => openLink(website.id, website.url)} /> : null}
          </div>
          <section className="-mx-5 mt-5 border-t border-[#eee6dc] bg-[#fffcf8] px-5 pt-4 text-left">
            <h2 className="text-lg font-bold">Find Us</h2>
            {site.settings.showAddress && site.business.address ? <p className="mt-4 flex items-start gap-2 text-sm font-medium text-[#3f3948]"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{site.business.address}</p> : null}
            {embedUrl ? (
              <div className="relative mt-5 overflow-hidden rounded-xl border border-[#eadfd4] bg-white">
                {routeUrl ? <button onClick={() => openLink("directions", routeUrl)} className="absolute left-3 top-3 z-10 rounded-sm bg-white px-3 py-2 text-sm font-bold text-[#2b7de9] shadow" type="button">Open in Maps <ExternalLink className="ml-1 inline h-3 w-3" /></button> : null}
                <iframe title={`${site.business.name} location`} src={embedUrl} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </section>
          {site.business.googleReviewUrl ? <button onClick={() => openLink("google-review", site.business.googleReviewUrl)} className="mt-5 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700" type="button"><MessageSquare className="mr-1 inline h-4 w-4" />Leave a Google Review</button> : null}
          <section className="mt-5 grid gap-3">
            {enabledLinks.filter((link) => !["whatsapp", "website"].includes(link.label.toLowerCase())).map((link) => <button key={link.id} onClick={() => openLink(link.id, link.url)} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-semibold text-[#171421]" type="button"><span className="flex min-w-0 items-center gap-3"><img src={socialIconFor(link.label)} alt="" className="h-6 w-6 shrink-0" /><span className="min-w-0"><span className="block truncate">{link.label}</span><span className="block truncate text-xs font-normal text-[#676171]">{link.url}</span></span></span><ExternalLink className="h-4 w-4 shrink-0 text-[#676171]" /></button>)}
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
      className={`group flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-[#eee6dc] bg-white py-3.5 text-[#171421] transition hover:border-[#5a2b12] hover:bg-[#5a2b12] hover:text-white active:scale-95`}
      type="button"
    >
      <Icon className="h-5 w-5" />
      <span className="max-w-full truncate px-1 text-[0.7rem] font-semibold">{label}</span>
    </button>
  );
}

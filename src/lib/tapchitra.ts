"use client";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "@firebase/firestore";
import { db } from "@/lib/firebase";

export type TapLink = {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  order: number;
  clicks?: number;
};

export type TapReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  enabled: boolean;
};

export type TapSite = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  siteType: "qr_profile" | "website" | "store" | "portfolio";
  status: "draft" | "active" | "paused";
  qrCode: string;
  publicPath: string;
  business: {
    name: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
    coverImage: string;
    openingHours: string;
    googleMapsUrl: string;
    latitude: number | null;
    longitude: number | null;
    googleReviewUrl: string;
    categoryTags: string[];
    googleRating: string;
    googleReviewCount: string;
    locationLabel: string;
  };
  settings: {
    theme: "light" | "dark";
    accentColor: string;
    showAddress: boolean;
    showPhone: boolean;
    notifications: boolean;
  };
  links: TapLink[];
  analytics: {
    scans: number;
    linkClicks: number;
    dailyScans: number[];
  };
};

const demoScans = [2, 5, 4, 8, 7, 11, 15, 12, 18, 16, 21, 25];

export function platformUrl() {
  return (
    process.env.NEXT_PUBLIC_PLATFORM_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://tap.chitratech.com.np")
  ).replace(/\/$/, "");
}

export function publicUrlForCode(code: string) {
  return `${platformUrl()}/t/${code}`;
}

export function completionForSite(site: TapSite) {
  const fields = [
    site.business.name,
    site.business.description,
    site.business.phone,
    site.business.email,
    site.business.address,
    site.business.logo,
    site.business.coverImage,
    site.business.openingHours,
    site.business.googleMapsUrl,
    site.business.googleReviewUrl,
    (site.business.categoryTags || []).length > 0,
    site.links.some((link) => link.enabled && link.url),
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

export function newQrCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function extractCoordinatesFromMapsUrl(value: string) {
  const decoded = decodeURIComponent(value.trim());
  const patterns = [
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /[?&]q=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
    /[?&]ll=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);
    if (match) {
      const latitude = Number(match[1]);
      const longitude = Number(match[2]);
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        return { latitude, longitude };
      }
    }
  }

  return null;
}

export function mapEmbedUrl(site: TapSite) {
  const { latitude, longitude, address, googleMapsUrl } = site.business;
  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
  }
  const queryValue = address || googleMapsUrl;
  return queryValue ? `https://maps.google.com/maps?q=${encodeURIComponent(queryValue)}&z=16&output=embed` : "";
}

export function directionsUrl(site: TapSite) {
  const { latitude, longitude, address, googleMapsUrl } = site.business;
  if (googleMapsUrl) return googleMapsUrl;
  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  }
  if (address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  }
  return "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48) || `site-${Date.now()}`;
}

function siteFromDoc(id: string, data: Record<string, any>): TapSite {
  return {
    id,
    ownerId: data.ownerId,
    name: data.name || data.business?.name || "My Business",
    slug: data.slug || slugify(data.name || "my-business"),
    siteType: data.siteType || "qr_profile",
    status: data.status || "active",
    qrCode: data.qrCode,
    publicPath: `/t/${data.qrCode}`,
    business: {
      name: data.business?.name || data.name || "My Business",
      description: data.business?.description || "",
      phone: data.business?.phone || "",
      email: data.business?.email || "",
      address: data.business?.address || "",
      logo: data.business?.logo || "",
      coverImage: data.business?.coverImage || "",
      openingHours: data.business?.openingHours || "",
      googleMapsUrl: data.business?.googleMapsUrl || "",
      latitude: typeof data.business?.latitude === "number" ? data.business.latitude : null,
      longitude: typeof data.business?.longitude === "number" ? data.business.longitude : null,
      googleReviewUrl: data.business?.googleReviewUrl || "",
      categoryTags: Array.isArray(data.business?.categoryTags) ? data.business.categoryTags : [],
      googleRating: data.business?.googleRating || "",
      googleReviewCount: data.business?.googleReviewCount || "",
      locationLabel: data.business?.locationLabel || "",
    },
    settings: {
      theme: data.settings?.theme || "light",
      accentColor: data.settings?.accentColor || "#6544e8",
      showAddress: data.settings?.showAddress ?? true,
      showPhone: data.settings?.showPhone ?? true,
      notifications: data.settings?.notifications ?? true,
    },
    links: (data.links || []).sort((a: TapLink, b: TapLink) => a.order - b.order),
    analytics: {
      scans: data.analytics?.scans || 0,
      linkClicks: data.analytics?.linkClicks || 0,
      dailyScans: data.analytics?.dailyScans || demoScans,
    },
  };
}

export async function getOrCreateSite(userId: string, email: string, name: string) {
  const sitesRef = collection(db, "sites");
  const existing = await getDocs(query(sitesRef, where("ownerId", "==", userId), limit(1)));
  if (!existing.empty) {
    const snap = existing.docs[0];
    return siteFromDoc(snap.id, snap.data());
  }

  const code = newQrCode();
  const businessName = name ? `${name}'s Business` : "My Business";
  const created = await addDoc(sitesRef, {
    ownerId: userId,
    name: businessName,
    slug: slugify(businessName),
    siteType: "qr_profile",
    status: "active",
    qrCode: code,
    business: {
      name: businessName,
      description: "A TapChitra digital business profile.",
      phone: "",
      email,
      address: "",
      logo: "",
      coverImage: "",
      openingHours: "",
      googleMapsUrl: "",
      latitude: null,
      longitude: null,
      googleReviewUrl: "",
      categoryTags: [],
      googleRating: "",
      googleReviewCount: "",
      locationLabel: "",
    },
    settings: {
      theme: "light",
      accentColor: "#6544e8",
      showAddress: true,
      showPhone: true,
      notifications: true,
    },
    links: [
      { id: crypto.randomUUID(), label: "Website", url: "", enabled: false, order: 0, clicks: 0 },
      { id: crypto.randomUUID(), label: "Instagram", url: "", enabled: false, order: 1, clicks: 0 },
    ],
    analytics: { scans: 0, linkClicks: 0, dailyScans: [] },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await setDoc(doc(db, "qr_codes", code), {
    siteId: created.id,
    code,
    type: "qr_nfc",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await setDoc(doc(db, "domains", `${created.id}_platform`), {
    siteId: created.id,
    domain: new URL(platformUrl()).hostname,
    type: "platform",
    isPrimary: true,
    isVerified: true,
    sslStatus: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return getOrCreateSite(userId, email, name);
}

export async function saveSite(site: TapSite) {
  const business = {
    name: site.business.name || "",
    description: site.business.description || "",
    phone: site.business.phone || "",
    email: site.business.email || "",
    address: site.business.address || "",
    logo: site.business.logo || "",
    coverImage: site.business.coverImage || "",
    openingHours: site.business.openingHours || "",
    googleMapsUrl: site.business.googleMapsUrl || "",
    latitude: typeof site.business.latitude === "number" ? site.business.latitude : null,
    longitude: typeof site.business.longitude === "number" ? site.business.longitude : null,
    googleReviewUrl: site.business.googleReviewUrl || "",
    categoryTags: Array.isArray(site.business.categoryTags) ? site.business.categoryTags.filter(Boolean) : [],
    googleRating: site.business.googleRating || "",
    googleReviewCount: site.business.googleReviewCount || "",
    locationLabel: site.business.locationLabel || "",
  };

  await updateDoc(doc(db, "sites", site.id), {
    name: business.name,
    slug: slugify(business.name),
    status: site.status,
    business,
    settings: site.settings,
    links: site.links.map((link, index) => ({ ...link, order: index })),
    updatedAt: serverTimestamp(),
  });
}

export async function regenerateSiteQr(site: TapSite) {
  const code = newQrCode();
  const batch = writeBatch(db);
  batch.update(doc(db, "sites", site.id), { qrCode: code, updatedAt: serverTimestamp() });
  batch.set(doc(db, "qr_codes", code), {
    siteId: site.id,
    code,
    type: "qr_nfc",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await batch.commit();
  return code;
}

export async function resolveSiteByQr(code: string) {
  const qrSnap = await getDocs(query(collection(db, "sites"), where("qrCode", "==", code), limit(1)));
  if (qrSnap.empty) return null;
  const snap = qrSnap.docs[0];
  return siteFromDoc(snap.id, snap.data());
}

export async function recordScan(site: TapSite) {
  const dailyScans = [...site.analytics.dailyScans.slice(-11), 1];
  await updateDoc(doc(db, "sites", site.id), {
    analytics: {
      ...site.analytics,
      scans: site.analytics.scans + 1,
      dailyScans,
    },
  });
  await addDoc(collection(db, "analytics_events"), {
    siteId: site.id,
    type: "scan",
    createdAt: serverTimestamp(),
  });
}

export async function recordLinkClick(site: TapSite, linkId: string) {
  const links = site.links.map((link) =>
    link.id === linkId ? { ...link, clicks: (link.clicks || 0) + 1 } : link,
  );
  await updateDoc(doc(db, "sites", site.id), {
    links,
    analytics: { ...site.analytics, linkClicks: site.analytics.linkClicks + 1 },
  });
}

import type { User } from "@firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: string;
};

export async function ensureUserProfile(user: User, name = "") {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }

  const profile = {
    uid: user.uid,
    name: name || user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    role: "user",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);
  return {
    uid: profile.uid,
    name: profile.name,
    email: profile.email,
    role: profile.role,
  };
}

export async function getUserProfile(uid: string) {
  const userSnap = await getDoc(doc(db, "users", uid));
  return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
}

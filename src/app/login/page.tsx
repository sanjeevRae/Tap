"use client";

import * as React from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { FirebaseError } from "@firebase/app";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/users";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const isSignup = mode === "signup";

  function getAuthErrorMessage(error: unknown) {
    if (!(error instanceof FirebaseError)) {
      return isSignup ? "Unable to create account." : "Unable to sign in.";
    }

    if (error.code === "auth/email-already-in-use") {
      return "This email is already registered. Log in instead.";
    }

    if (error.code === "auth/invalid-credential") {
      return "Email or password is incorrect.";
    }

    if (error.code === "auth/weak-password") {
      return "Password should be at least 6 characters.";
    }

    if (error.code === "auth/configuration-not-found") {
      return "Firebase email/password login is not enabled.";
    }

    if (error.code === "auth/popup-closed-by-user") {
      return "Google sign-in was cancelled.";
    }

    return error.message || (isSignup ? "Unable to create account." : "Unable to sign in.");
  }

  async function submitWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() });
        }

        ensureUserProfile(credential.user, name.trim()).catch(console.error);
      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        ensureUserProfile(credential.user).catch(console.error);
      }
      router.push("/dashboard");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setError("");
    setMessage("");
      setLoading(true);

    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      ensureUserProfile(credential.user).catch(console.error);
      router.push("/dashboard");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent.");
    } catch {
      setError("Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh overflow-y-auto bg-white text-[#1f1f1f]">
      <section className="relative flex min-h-dvh w-full items-stretch justify-center overflow-hidden px-0">
        <div className="absolute inset-0 bg-[#f6f6f4]">
          <div className="flex h-20 items-center justify-between border-b border-black/5 bg-white/70 px-10">
            <div className="h-6 w-36 rounded bg-black/10" />
            <div className="hidden items-center gap-8 md:flex">
              <div className="h-3 w-16 rounded bg-black/10" />
              <div className="h-3 w-20 rounded bg-black/10" />
              <div className="h-3 w-14 rounded bg-black/10" />
            </div>
          </div>
          <div className="grid h-[calc(100%-5rem)] grid-cols-3 gap-5 p-8 blur-sm">
            <div className="rounded-sm bg-white/80 shadow-sm" />
            <div className="rounded-sm bg-white/70 shadow-sm" />
            <div className="rounded-sm bg-white/80 shadow-sm" />
            <div className="col-span-2 rounded-sm bg-white/75 shadow-sm" />
            <div className="rounded-sm bg-white/70 shadow-sm" />
          </div>
        </div>
        <div className="absolute inset-0 bg-white/55 backdrop-blur-md" />

        <form
          onSubmit={submitWithEmail}
          className="relative z-10 flex min-h-dvh w-full max-w-[26rem] flex-col justify-center bg-white px-6 py-10 text-left shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:px-8"
        >
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute right-6 top-5 text-[#1f1f1f] transition hover:opacity-60"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <h1 className="font-display text-[1.65rem] font-medium leading-none text-[#171717]">
            Welcome!
          </h1>
          <p className="mt-4 max-w-[21rem] text-xs leading-5 text-[#666]">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[#1f1f1f] underline underline-offset-2"
            >
              Create a free account
            </button>{" "}
            or log in to get started using Tap Chitra
          </p>

          <div className="mt-5 space-y-3">
            {isSignup ? (
              <label className="block">
                <span className="text-[0.7rem] font-medium text-[#333]">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="mt-2 h-11 w-full rounded-sm border border-[#d7d7d7] bg-white px-5 text-sm text-[#202020] outline-none transition placeholder:text-[#b8b8b8] focus:border-[#1f1f1f]"
                  required
                />
              </label>
            ) : null}

            <label className="block">
              <span className="text-[0.7rem] font-medium text-[#333]">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="example@gmail.com"
                className="mt-2 h-11 w-full rounded-sm border border-[#d7d7d7] bg-white px-5 text-sm text-[#202020] outline-none transition placeholder:text-[#b8b8b8] focus:border-[#1f1f1f]"
                required
              />
            </label>

            <label className="block">
              <span className="text-[0.7rem] font-medium text-[#333]">Password</span>
              <span className="mt-2 flex h-11 items-center rounded-sm border border-[#d7d7d7] bg-white px-5 focus-within:border-[#1f1f1f]">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder=".........."
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#202020] outline-none placeholder:text-[#8a8a8a]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="ml-3 text-[#1f1f1f] transition hover:opacity-60"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={resetPassword}
            disabled={loading}
            className="mt-3 block text-right text-xs text-[#1f1f1f] underline underline-offset-2 hover:opacity-70"
          >
            Forgot password?
          </button>

          {error ? (
            <p className="mt-3 rounded-sm bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="mt-3 rounded-sm bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 h-11 w-full rounded-sm bg-black text-sm font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
          </button>

          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={loading}
            className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-sm border border-[#d7d7d7] bg-white text-sm text-[#222] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Sign in with Google"
          >
            <span className="font-semibold text-[#4285f4]">G</span>
            Log in with Google
          </button>

          <p className="mt-3 text-center text-xs text-[#666]">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setMode(isSignup ? "login" : "signup")}
              className="text-[#1f1f1f] underline underline-offset-2"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

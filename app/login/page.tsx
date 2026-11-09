"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/components/Providers";
import { googleEnabled, googleIdToken } from "@/lib/firebaseClient";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const dest = next && next.startsWith("/") && !next.startsWith("//") ? next : "/gallery";
  const { setUser } = useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [v, setV] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function google() {
    setBusy(true); setErrors({});
    try {
      const idToken = await googleIdToken();
      const r = await fetch("/api/auth/google", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
      if (!r.ok) throw new Error("server");
      const me = await (await fetch("/api/auth/me")).json();
      setUser(me.user, me.likes);
      router.replace(dest);
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") setErrors({ password: "تعذّر الدخول بجوجل، حاول مرة أخرى" });
      setBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErrors({});
    const r = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { setErrors(d.errors || { password: "حصلت مشكلة، حاول مرة أخرى" }); setBusy(false); return; }
    const me = await (await fetch("/api/auth/me")).json();
    setUser(me.user, me.likes);
    router.replace(dest);
  }
  const input = (id: "name" | "email" | "password", label: string, type: string, auto: string, ltr = false) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm">{label}</label>
      <input id={id} type={type} className="field" autoComplete={auto} dir={ltr ? "ltr" : undefined} value={v[id]} onChange={(e) => setV({ ...v, [id]: e.target.value })} aria-invalid={!!errors[id]} />
      {errors[id] && <p className="mt-1 text-sm text-red-700">{errors[id]}</p>}
    </div>
  );
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">{mode === "login" ? "تسجيل الدخول" : "حساب جديد"}</h1>
      <p className="mt-2 text-sm text-muted">سجّل دخولك لتتصفح المعرض، وكل منتج تعمله لايك بيساعدنا نعرض لك اللي يشبه ذوقك.</p>
      {googleEnabled && (
        <>
          <button type="button" onClick={google} disabled={busy} className="btn btn-line mt-8 w-full !bg-surface">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7a14.500 14.500 0 0 1 0-9.4l-7.900-6.100a24 24 0 0 0 0 21.600l7.900-6.100z"/><path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z"/></svg>
            المتابعة بجوجل
          </button>
          <div className="my-4 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />أو بالبريد<span className="h-px flex-1 bg-line" /></div>
        </>
      )}
      <form onSubmit={submit} noValidate className={`${googleEnabled ? "" : "mt-8 "}space-y-4 bg-surface p-6`}>
        {mode === "register" && input("name", "الاسم", "text", "name")}
        {input("email", "البريد الإلكتروني", "email", "email", true)}
        {input("password", "كلمة السر", "password", mode === "login" ? "current-password" : "new-password", true)}
        <button className="btn w-full" disabled={busy}>{busy ? "…" : mode === "login" ? "دخول" : "إنشاء الحساب"}</button>
      </form>
      <button className="mt-4 text-sm underline" onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); }}>
        {mode === "login" ? "معنديش حساب، أنشئ حساب" : "عندي حساب بالفعل"}
      </button>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <form className="w-full max-w-sm space-y-4 bg-surface p-8" onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setErr("");
        const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
        if (r.ok) { router.replace("/admin"); router.refresh(); } else { setErr("كلمة السر غير صحيحة"); setBusy(false); }
      }}>
        <h1 className="text-xl font-semibold">دخول لوحة التحكم</h1>
        <input type="password" className="field" placeholder="كلمة السر" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus autoComplete="current-password" dir="ltr" />
        {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
        <button className="btn w-full" disabled={busy || !pw}>دخول</button>
      </form>
    </div>
  );
}

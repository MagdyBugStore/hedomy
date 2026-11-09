import { cookies } from "next/headers";

const API = process.env.API_URL || "http://127.0.0.1:4100";

/** Server-side call to hedomy-api, forwarding the visitor's cookies (sessions). Returns null on 404/401. */
export async function api<T>(path: string): Promise<T | null> {
  const jar = (await cookies()).getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const r = await fetch(`${API}${path}`, { headers: { cookie: jar }, cache: "no-store" });
  if (r.status === 404 || r.status === 401) return null;
  if (!r.ok) throw new Error(`API ${path} -> ${r.status}`);
  return (await r.json()) as T;
}

"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "@/lib/types";
import { FREE_SHIP_OVER, SHIPPING } from "@/lib/config";

export type SessionUser = { id: string; name: string; email: string };
type Ctx = {
  user: SessionUser | null;
  authReady: boolean;
  setUser: (u: SessionUser | null, likes?: string[]) => void;
  cart: CartLine[];
  favs: string[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (l: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleFav: (id: string, source?: "heart" | "gallery") => void;
  toast: string;
  notify: (m: string) => void;
};
const C = createContext<Ctx | null>(null);
export const useStore = () => {
  const c = useContext(C);
  if (!c) throw new Error("StoreProvider missing");
  return c;
};

function load<T>(k: string, d: T): T {
  try { const v = localStorage.getItem("hdoumi_" + k); return v ? JSON.parse(v) : d; } catch { return d; }
}
function save(k: string, v: unknown) {
  try { localStorage.setItem("hdoumi_" + k, JSON.stringify(v)); } catch { /* storage blocked */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const [user, setUserState] = useState<SessionUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setCart(load("cart", []));
    setFavs(load("favs", []));
    setReady(true);
    fetch("/api/auth/me").then((r) => r.json()).then(async (d) => {
      if (d.user) {
        const local = load<string[]>("favs", []);
        let likes: string[] = d.likes;
        if (local.length) {
          await fetch("/api/likes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ merge: local }) }).catch(() => {});
          save("favs", []);
          likes = [...new Set([...local, ...likes])];
        }
        setUserState(d.user); setFavs(likes);
      }
    }).catch(() => {}).finally(() => setAuthReady(true));
  }, []);
  useEffect(() => { if (ready) save("cart", cart); }, [cart, ready]);
  useEffect(() => { if (ready && authReady && !user) save("favs", favs); }, [favs, ready, authReady, user]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "hdoumi_cart") setCart(load("cart", []));
      if (e.key === "hdoumi_favs") setFavs(load("favs", []));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((m: string) => setToast(m), []);
  const addToCart: Ctx["addToCart"] = useCallback((l, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === l.id && x.size === l.size);
      if (i >= 0) return c.map((x, j) => (j === i ? { ...x, qty: Math.min(10, x.qty + qty) } : x));
      return [...c, { ...l, qty }];
    });
    setToast("تمت الإضافة إلى السلة");
  }, []);
  const setQty = useCallback((id: string, size: string, qty: number) => {
    setCart((c) => c.flatMap((x) => (x.id === id && x.size === size ? (qty <= 0 ? [] : [{ ...x, qty: Math.min(10, qty) }]) : [x])));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const setUser = useCallback((u: SessionUser | null, likes?: string[]) => {
    setUserState(u);
    if (u) {
      const local = load<string[]>("favs", []);
      if (local.length) {
        fetch("/api/likes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ merge: local }) }).catch(() => {});
        save("favs", []);
      }
      setFavs([...new Set([...local, ...(likes || [])])]);
    } else setFavs(load("favs", []));
  }, []);
  const toggleFav = useCallback((id: string, source: "heart" | "gallery" = "heart") => {
    const has = favs.includes(id);
    setFavs((f) => (has ? f.filter((x) => x !== id) : [id, ...f]));
    if (user) fetch("/api/likes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, like: !has, source }) }).catch(() => {});
  }, [favs, user]);

  const value = useMemo<Ctx>(() => {
    const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIP_OVER ? 0 : SHIPPING;
    return {
      cart, favs, count: cart.reduce((s, l) => s + l.qty, 0), subtotal, shipping, total: subtotal + shipping,
      addToCart, setQty, clearCart, toggleFav, toast, notify, user, authReady, setUser,
    };
  }, [cart, favs, addToCart, setQty, clearCart, toggleFav, toast, notify, user, authReady, setUser]);

  return (
    <C.Provider value={value}>
      {children}
      <div aria-live="polite" className={`pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center transition-opacity ${toast ? "opacity-100" : "opacity-0"}`}>
        <div className="rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg">{toast}</div>
      </div>
    </C.Provider>
  );
}

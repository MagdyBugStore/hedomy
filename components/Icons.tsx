const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export const HeartIcon = ({ filled = false, size = 22 }: { filled?: boolean; size?: number }) => (
  <svg {...base} width={size} height={size} fill={filled ? "currentColor" : "none"}><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.4 5 6.6 5c2 0 3.5 1.1 5.4 3.2C13.9 6.1 15.4 5 17.4 5c3.2 0 4.9 3 3.8 6.2-1.7 4.7-9.2 9.3-9.2 9.3z" /></svg>
);
export const BagIcon = () => (<svg {...base}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const SearchIcon = () => (<svg {...base}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const FilterIcon = () => (<svg {...base} width={18} height={18}><path d="M4 6h16M7 12h10M10 18h4" /></svg>);
export const CloseIcon = () => (<svg {...base} width={20} height={20}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const MenuIcon = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);

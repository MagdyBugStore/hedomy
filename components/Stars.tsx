export default function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" dir="ltr" role="img" aria-label={`${value} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const f = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id={`g${i}-${Math.round(f * 100)}`}><stop offset={`${f * 100}%`} stopColor="#1a1a1a" /><stop offset={`${f * 100}%`} stopColor="#d4d4d0" /></linearGradient></defs>
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" fill={`url(#g${i}-${Math.round(f * 100)})`} />
          </svg>
        );
      })}
    </span>
  );
}

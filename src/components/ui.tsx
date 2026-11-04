import React, { useEffect, useRef } from 'react';
import { X, Star as StarIcon, Circle } from 'lucide-react';
import { ICONS } from './icons';
import { tap } from '../lib/haptics';

export function Icon({ name, size = 20, className, strokeWidth = 2.2 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Cmp = ICONS[name] ?? Circle;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

type BtnVariant = 'primary' | 'pink' | 'ghost' | 'outline';
export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const styles: Record<BtnVariant, string> = {
    primary: 'bg-cyan text-ink shadow-[0_0_24px_rgba(0,245,255,0.35)] active:shadow-none',
    pink: 'bg-pink text-ink shadow-[0_0_24px_rgba(255,75,137,0.35)] active:shadow-none',
    ghost: 'bg-white/5 text-text border border-line',
    outline: 'border border-cyan/50 text-cyan bg-transparent',
  };
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        tap();
        onClick?.();
      }}
      className={`min-h-12 px-5 rounded-2xl font-display font-extrabold uppercase tracking-wider text-[15px] transition active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function IconButton({ icon, label, onClick, className = '' }: { icon: string; label: string; onClick: () => void; className?: string }) {
  return (
    <button
      aria-label={label}
      onClick={() => {
        tap();
        onClick();
      }}
      className={`w-11 h-11 grid place-items-center rounded-full bg-white/5 border border-line text-text active:scale-95 transition ${className}`}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}

export function Bar({ pct, color = '#00f5ff', className = '' }: { pct: number; color?: string; className?: string }) {
  return (
    <div className={`h-2 rounded-full bg-white/8 overflow-hidden ${className}`} role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${Math.max(0, Math.min(1, pct)) * 100}%`, background: color, boxShadow: `0 0 12px ${color}88` }}
      />
    </div>
  );
}

export function Stars({ n, size = 16, max = 3 }: { n: number; size?: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <StarIcon key={i} size={size} className={i < n ? 'text-gold fill-gold' : 'text-white/20'} aria-hidden />
      ))}
    </span>
  );
}

export function Sheet({ open, onClose, children, title, tall, footer }: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string; tall?: boolean; footer?: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" className="absolute inset-0 bg-black/65 anim-fade" onClick={onClose} />
      <div className={`relative w-full max-w-lg bg-panel border-t border-line rounded-t-[28px] anim-sheet flex flex-col ${tall ? 'h-[88vh]' : 'max-h-[88vh]'}`}>
        <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
          <div className="w-10" />
          <div className="w-10 h-1.5 rounded-full bg-white/15" />
          <button aria-label="Close" onClick={onClose} className="w-11 h-11 grid place-items-center rounded-full bg-white/5 text-muted active:scale-95">
            <X size={18} />
          </button>
        </div>
        {title && <h2 className="px-6 pb-3 font-display font-extrabold text-2xl uppercase tracking-tight shrink-0">{title}</h2>}
        <div className={`overflow-y-auto no-scrollbar px-6 flex-1 ${footer ? 'pb-4' : 'pb-safe'}`}>{children}</div>
        {footer && <div className="shrink-0 px-6 pt-3 pb-safe border-t border-line bg-panel">{footer}</div>}
      </div>
    </div>
  );
}

export function Toast({ children, onDone, ms = 2600 }: { children: React.ReactNode; onDone: () => void; ms?: number }) {
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const t = setTimeout(() => done.current(), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-[80] anim-pop w-max max-w-[90vw]" style={{ bottom: 'calc(max(var(--sab), 12px) + 84px)' }} role="status">
      <div className="glass rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 text-sm font-semibold">{children}</div>
    </div>
  );
}

export function Eyebrow({ children, color = 'text-cyan' }: { children: React.ReactNode; color?: string }) {
  return <div className={`font-display font-bold text-[11px] tracking-[0.22em] uppercase ${color}`}>{children}</div>;
}

export function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-3xl bg-panel border border-line ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Avatar({ name, color, emoji, size = 64 }: { name: string; color: string; emoji?: string; size?: number }) {
  const initial = (name.trim()[0] ?? '?').toUpperCase();
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full anim-ring"
        style={{ background: `conic-gradient(from 140deg, ${color}, #0f131e 40%, ${color} 75%, #0f131e)`, ['--ring' as string]: color }}
      />
      <div className="absolute inset-[3px] rounded-full bg-ink grid place-items-center">
        <span className="font-display font-black" style={{ fontSize: size * 0.42, color }}>
          {initial}
        </span>
      </div>
      {emoji && (
        <span className="absolute -bottom-1 -right-1 grid place-items-center rounded-full bg-panel-2 border border-line" style={{ width: size * 0.4, height: size * 0.4, fontSize: size * 0.22 }}>
          {emoji}
        </span>
      )}
    </div>
  );
}

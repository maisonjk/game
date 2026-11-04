import { SKILLS, SKILL_ORDER } from '../data';

export function Radar({ values, max }: { values: number[]; max: number }) {
  const size = 220;
  const c = size / 2;
  const r = 70;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
  };
  const poly = values.map((v, i) => pt(i, max ? Math.max(0.06, v / max) : 0.06).join(',')).join(' ');
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[240px] mx-auto" role="img" aria-label="Skill radar chart">
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon key={k} points={values.map((_, i) => pt(i, k).join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" />
      ))}
      {values.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />;
      })}
      <polygon points={poly} fill="rgba(0,245,255,0.18)" stroke="#00f5ff" strokeWidth="2" strokeLinejoin="round" />
      {SKILL_ORDER.map((k, i) => {
        const [x, y] = pt(i, 1.3);
        return (
          <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={SKILLS[k].color} fontSize="9" fontWeight="700" letterSpacing="1">
            {SKILLS[k].short}
          </text>
        );
      })}
    </svg>
  );
}

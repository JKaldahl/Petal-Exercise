import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import useFlowerStore, { PETAL_IDS } from '../store/flowerStore';

const PETAL_META = [
  { id: 'petal1_people',     num: 1, label: 'People',     emoji: '👥' },
  { id: 'petal2_conditions', num: 2, label: 'Conditions', emoji: '🏢' },
  { id: 'petal3_skills',     num: 3, label: 'Skills',     emoji: '⚡' },
  { id: 'petal4_knowledges', num: 4, label: 'Knowledge',  emoji: '📚' },
  { id: 'petal5_salary',     num: 5, label: 'Salary',     emoji: '💰' },
  { id: 'petal6_geography',  num: 6, label: 'Geography',  emoji: '🌍' },
  { id: 'petal7_purpose',    num: 7, label: 'Purpose',    emoji: '✨' },
];

function PetalDot({ petal, compact = false }) {
  const completedPetals = useFlowerStore((s) => s.completedPetals);
  const done = completedPetals.includes(petal.id);

  return (
    <NavLink
      to={`/petal/${petal.num}`}
      title={petal.label}
      className={`
        flex flex-col items-center gap-0.5 group transition-all duration-150
        ${compact ? 'w-8' : 'w-10'}
      `}
    >
      <span
        className={`
          flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200
          ${compact ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'}
          ${done
            ? 'bg-green-500 text-white shadow-sm'
            : 'bg-gray-100 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600'}
        `}
      >
        {done ? '✓' : petal.num}
      </span>
      {!compact && (
        <span className={`text-[10px] leading-none ${done ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
          {petal.label}
        </span>
      )}
    </NavLink>
  );
}

export default function AppShell() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">

      {/* ── Top nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-1.5 shrink-0 font-bold text-gray-800 text-lg">
            🌸 <span className="hidden sm:inline">MyFlower</span>
          </NavLink>

          {/* Petal progress dots */}
          <nav className="flex items-end gap-1 overflow-x-auto no-scrollbar">
            {PETAL_META.map((p) => (
              <PetalDot key={p.id} petal={p} />
            ))}
          </nav>

          {/* View My Flower CTA */}
          <button
            onClick={() => navigate('/flower')}
            className="shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full bg-green-500 text-white hover:bg-green-600 active:scale-95 transition-all duration-150 whitespace-nowrap"
          >
            View My Flower
          </button>
        </div>
      </header>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <nav className="sm:hidden sticky bottom-0 z-30 bg-white border-t border-gray-200 px-2 py-2">
        <div className="flex justify-around">
          {PETAL_META.map((p) => (
            <PetalDot key={p.id} petal={p} compact />
          ))}
        </div>
      </nav>
    </div>
  );
}

// Export metadata so petal pages can use it without re-declaring
export { PETAL_META };

import { useNavigate } from 'react-router-dom';
import useFlowerStore, { PETAL_IDS } from '../store/flowerStore';

const PETAL_INFO = [
  {
    id: 'petal1_people',
    num: 1,
    name: 'People',
    emoji: '👥',
    description: 'The kinds of people you most enjoy working with.',
  },
  {
    id: 'petal2_conditions',
    num: 2,
    name: 'Working Conditions',
    emoji: '🏢',
    description: 'The environment and culture where you do your best work.',
  },
  {
    id: 'petal3_skills',
    num: 3,
    name: 'Skills & Abilities',
    emoji: '⚡',
    description: 'The transferable skills you love using most.',
  },
  {
    id: 'petal4_knowledges',
    num: 4,
    name: 'Knowledges',
    emoji: '📚',
    description: 'The subjects and fields you know deeply and want to use.',
  },
  {
    id: 'petal5_salary',
    num: 5,
    name: 'Salary & Level',
    emoji: '💰',
    description: 'What you need to earn and the responsibility level you want.',
  },
  {
    id: 'petal6_geography',
    num: 6,
    name: 'Geography',
    emoji: '🌍',
    description: 'Where in the world you want to live and work.',
  },
  {
    id: 'petal7_purpose',
    num: 7,
    name: 'Purpose & Values',
    emoji: '✨',
    description: 'The mission and meaning that drives you.',
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const completedPetals = useFlowerStore((s) => s.completedPetals);
  const hasProgress = completedPetals.length > 0;

  const firstIncompletePetal = PETAL_IDS.findIndex(
    (id) => !completedPetals.includes(id)
  );
  const resumeNum = firstIncompletePetal === -1 ? 7 : firstIncompletePetal + 1;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center py-10 px-4">

      {/* Flower illustration */}
      <div className="text-8xl mb-4 select-none" aria-hidden="true">🌸</div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center leading-tight mb-3">
        Discover Your<br />Ideal Work Life
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 text-center max-w-lg mb-2">
        The Flower Exercise guides you through 7 reflections to build a complete
        portrait of what you need to thrive at work.
      </p>

      {/* Time estimate */}
      <p className="text-sm text-amber-700 font-medium bg-amber-100 rounded-full px-4 py-1.5 mb-8">
        ⏱ Plan for 60–90 minutes. Save and return anytime.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12 w-full max-w-sm">
        <button
          onClick={() => navigate('/petal/1')}
          className="flex-1 py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-base shadow-md hover:shadow-lg active:scale-95 transition-all duration-150"
        >
          Start the Exercise
        </button>

        {hasProgress && (
          <button
            onClick={() => navigate(`/petal/${resumeNum}`)}
            className="flex-1 py-3.5 rounded-2xl border-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold text-base active:scale-95 transition-all duration-150"
          >
            Resume Where I Left Off
          </button>
        )}
      </div>

      {/* Petal list */}
      <div className="w-full max-w-lg flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          The 7 Petals
        </h2>
        {PETAL_INFO.map((petal) => {
          const done = completedPetals.includes(petal.id);
          return (
            <button
              key={petal.id}
              onClick={() => navigate(`/petal/${petal.num}`)}
              className={`
                flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-2xl border-2
                transition-all duration-150 active:scale-[0.99]
                ${done
                  ? 'border-green-300 bg-green-50 hover:bg-green-100'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:bg-amber-50'}
              `}
            >
              <span className="text-2xl shrink-0">{petal.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${done ? 'text-green-800' : 'text-gray-800'}`}>
                  {petal.num}. {petal.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{petal.description}</p>
              </div>
              {done && (
                <span className="shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import useFlowerStore from '../store/flowerStore';
import { PETAL_META } from './AppShell';

export default function PetalShell({ children }) {
  const { id } = useParams();
  const petalNum = parseInt(id, 10);
  const navigate = useNavigate();
  const markPetalComplete = useFlowerStore((s) => s.markPetalComplete);

  const current = PETAL_META.find((p) => p.num === petalNum);
  const petalId = current?.id;

  const handleNext = () => {
    if (petalId) markPetalComplete(petalId);
    if (petalNum < 7) {
      navigate(`/petal/${petalNum + 1}`);
    } else {
      navigate('/flower');
    }
  };

  const handlePrev = () => {
    if (petalNum > 1) {
      navigate(`/petal/${petalNum - 1}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      {/* Petal header label */}
      {current && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{current.emoji}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Petal {current.num} of 7
            </p>
            <h2 className="text-xl font-bold text-gray-800 leading-tight">{current.label}</h2>
          </div>
        </div>
      )}

      {/* Page content */}
      <div className="flex-1">{children}</div>

      {/* Footer navigation */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 active:scale-95 transition-all duration-150"
        >
          ← {petalNum === 1 ? 'Welcome' : `Petal ${petalNum - 1}`}
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow active:scale-95 transition-all duration-150"
        >
          {petalNum === 7 ? 'View My Flower 🌸' : `Next →`}
        </button>
      </div>
    </div>
  );
}

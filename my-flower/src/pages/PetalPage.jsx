import { useParams } from 'react-router-dom';
import PetalShell from '../components/PetalShell';

const PETAL_DESCRIPTIONS = {
  1: { name: 'People',            hint: 'Who do you love working with?' },
  2: { name: 'Working Conditions', hint: 'Where do you do your best work?' },
  3: { name: 'Skills & Abilities', hint: 'What skills energize you most?' },
  4: { name: 'Knowledges',         hint: 'What subjects do you know deeply?' },
  5: { name: 'Salary & Level',     hint: 'What do you need to earn and own?' },
  6: { name: 'Geography',          hint: 'Where in the world do you want to live?' },
  7: { name: 'Purpose & Values',   hint: 'What mission drives your work?' },
};

export default function PetalPage() {
  const { id } = useParams();
  const num = parseInt(id, 10);
  const meta = PETAL_DESCRIPTIONS[num] || { name: `Petal ${num}`, hint: '' };

  return (
    <PetalShell>
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <p className="text-5xl">🚧</p>
        <h3 className="text-xl font-bold text-gray-700">{meta.name}</h3>
        <p className="text-gray-500 max-w-sm">{meta.hint}</p>
        <p className="text-sm text-amber-600 bg-amber-100 rounded-full px-4 py-1.5">
          Exercise content coming in the next phase
        </p>
      </div>
    </PetalShell>
  );
}

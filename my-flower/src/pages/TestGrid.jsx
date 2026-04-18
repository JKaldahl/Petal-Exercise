import PrioritizingGrid from '../components/PrioritizingGrid';

const TEST_ITEMS = [
  'Creative freedom',
  'High salary',
  'Work-life balance',
  'Making a difference',
  'Job security',
  'Learning new skills',
];

export default function TestGrid() {
  const handleComplete = (ranked) => {
    console.log('Final ranked order:', ranked);
    alert(`Your top pick: "${ranked[0]}"\n\nFull order logged to console.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-10">
      <PrioritizingGrid
        items={TEST_ITEMS}
        title="What matters most in your career?"
        onComplete={handleComplete}
      />
    </div>
  );
}

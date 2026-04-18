import { useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ── Drag-and-drop sortable row ──────────────────────────────────────────────

function SortableRow({ id, rank, label }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm select-none"
    >
      <span className="text-sm font-bold text-white bg-green-500 rounded-full w-7 h-7 flex items-center justify-center shrink-0">
        {rank}
      </span>
      <span className="flex-1 text-gray-800 text-base">{label}</span>
      <span
        {...attributes}
        {...listeners}
        className="text-gray-400 cursor-grab active:cursor-grabbing px-1 text-xl leading-none"
        aria-label="Drag to reorder"
      >
        ⠿
      </span>
    </li>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function PrioritizingGrid({ items = [], onComplete, title }) {
  // Build all pairwise combinations once
  const pairs = useMemo(() => {
    const result = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        result.push([items[i], items[j]]);
      }
    }
    return result;
  }, [items]);

  const [pairIndex, setPairIndex] = useState(0);
  const [tallies, setTallies] = useState(() =>
    Object.fromEntries(items.map((item) => [item, 0]))
  );
  const [phase, setPhase] = useState('comparing'); // 'comparing' | 'ranking'
  const [ranked, setRanked] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handlePick = useCallback(
    (winner) => {
      const updated = { ...tallies, [winner]: tallies[winner] + 1 };
      setTallies(updated);

      const next = pairIndex + 1;
      if (next >= pairs.length) {
        // All pairs done — sort by tally descending
        const sorted = [...items].sort((a, b) => updated[b] - updated[a]);
        setRanked(sorted);
        setPhase('ranking');
      } else {
        setPairIndex(next);
      }
    },
    [tallies, pairIndex, pairs.length, items]
  );

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (active.id !== over?.id) {
        setRanked((prev) => {
          const oldIndex = prev.indexOf(active.id);
          const newIndex = prev.indexOf(over.id);
          return arrayMove(prev, oldIndex, newIndex);
        });
      }
    },
    []
  );

  const handleConfirm = () => onComplete?.(ranked);

  // ── Comparing phase ────────────────────────────────────────────────────────

  if (phase === 'comparing') {
    const [left, right] = pairs[pairIndex];
    const progress = Math.round((pairIndex / pairs.length) * 100);

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 py-8">
        {title && (
          <h2 className="text-2xl font-semibold text-gray-700 text-center">{title}</h2>
        )}

        {/* Progress */}
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Comparison {pairIndex + 1} of {pairs.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: '#4CAF50' }}
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center">
          Which matters more to you?
        </p>

        {/* Pair cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {[left, right].map((item) => (
            <button
              key={item}
              onClick={() => handlePick(item)}
              className="
                min-h-[120px] rounded-2xl border-2 border-gray-200 bg-white
                flex items-center justify-center text-center px-4 py-6
                text-gray-800 text-lg font-medium leading-snug
                shadow-sm transition-all duration-150
                hover:border-green-400 hover:bg-green-50 hover:shadow-md hover:scale-[1.02]
                active:scale-[0.98] active:bg-green-100
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400
              "
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400">Tap the one that feels more important right now.</p>
      </div>
    );
  }

  // ── Ranking phase ──────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 py-8">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-700 text-center">{title}</h2>
      )}

      <div className="w-full text-center">
        <p className="text-gray-600 mb-1">Here's how your choices ranked out.</p>
        <p className="text-sm text-gray-400">Drag to adjust the order if it doesn't feel right.</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ranked} strategy={verticalListSortingStrategy}>
          <ol className="w-full flex flex-col gap-2">
            {ranked.map((item, index) => (
              <SortableRow key={item} id={item} rank={index + 1} label={item} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      <button
        onClick={handleConfirm}
        className="
          mt-2 w-full py-4 rounded-2xl font-semibold text-white text-base
          transition-all duration-150 shadow-md
          hover:shadow-lg hover:brightness-110 active:scale-[0.98]
        "
        style={{ backgroundColor: '#4CAF50' }}
      >
        Looks good — use this ranking
      </button>
    </div>
  );
}

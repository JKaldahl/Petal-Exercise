import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TestGrid from './pages/TestGrid';

function Placeholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <h1 className="text-3xl font-bold text-amber-800">{title}</h1>
      <p className="text-amber-600 mt-2">Coming soon…</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Placeholder title="Welcome" />} />
        <Route path="/module/:id" element={<Placeholder title="Petal Module" />} />
        <Route path="/grid" element={<Placeholder title="Prioritizing Grid" />} />
        <Route path="/flower" element={<Placeholder title="Flower Diagram" />} />
        <Route path="/export" element={<Placeholder title="Export / Share" />} />
        <Route path="/test-grid" element={<TestGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

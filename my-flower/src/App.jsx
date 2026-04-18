import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import Welcome from './pages/Welcome';
import PetalPage from './pages/PetalPage';
import FlowerDiagram from './pages/FlowerDiagram';
import Export from './pages/Export';
import TestGrid from './pages/TestGrid';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone pages (no shell) */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/test-grid" element={<TestGrid />} />

        {/* Shell-wrapped routes */}
        <Route element={<AppShell />}>
          <Route path="/petal/:id" element={<PetalPage />} />
          <Route path="/flower" element={<FlowerDiagram />} />
          <Route path="/export" element={<Export />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

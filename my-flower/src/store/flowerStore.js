import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFlowerStore = create(
  persist(
    (set) => ({
      // Progress tracking
      completedModules: [],
      currentModule: null,

      // Petal data keyed by module id
      petalData: {},

      // Actions
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),

      markModuleComplete: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),

      savePetalData: (moduleId, data) =>
        set((state) => ({
          petalData: { ...state.petalData, [moduleId]: data },
        })),

      resetAll: () =>
        set({ completedModules: [], currentModule: null, petalData: {} }),
    }),
    { name: 'flower-store' }
  )
);

export default useFlowerStore;

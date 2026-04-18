import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  // crypto.randomUUID is available in all modern browsers and Node 14.17+
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const PETAL_IDS = [
  'petal1_people',
  'petal2_conditions',
  'petal3_skills',
  'petal4_knowledges',
  'petal5_salary',
  'petal6_geography',
  'petal7_purpose',
];

// ── Initial state ─────────────────────────────────────────────────────────────

const initialState = {
  sessionId: generateId(),
  completedPetals: [],

  petal1_people: {
    hollandCode: '',
    hollandSelections: [],
    dislikedTraits: [],
    preferredTraits: [],
  },

  petal2_conditions: {
    pastJobs: [],
    dislikedConditions: [],
    worstFive: [],
    preferredConditions: [],
  },

  petal3_skills: {
    stories: [],
    extractedSkills: [],
    topSkills: [],
    traits: [],
    combinedPhrases: [],
  },

  petal4_knowledges: {
    brainstormItems: [],
    topKnowledges: [],
  },

  petal5_salary: {
    budgetItems: [],
    minimumSalary: 0,
    targetSalary: 0,
    responsibilityLevel: '',
    responsibilityDescription: '',
    nonMonetaryRewards: [],
  },

  petal6_geography: {
    placesLived: [],
    dislikedFactors: [],
    preferredFactors: [],
    candidateLocations: [],
  },

  petal7_purpose: {
    meaningCategories: {},
    philosophyEssay: '',
    peakMoments: [],
    purposeStatement: '',
    impactThemes: [],
  },
};

// ── Store ─────────────────────────────────────────────────────────────────────

const useFlowerStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // ── Petal updaters ──────────────────────────────────────────────────────

      updatePetal1: (data) =>
        set((s) => ({ petal1_people: { ...s.petal1_people, ...data } })),

      updatePetal2: (data) =>
        set((s) => ({ petal2_conditions: { ...s.petal2_conditions, ...data } })),

      updatePetal3: (data) =>
        set((s) => ({ petal3_skills: { ...s.petal3_skills, ...data } })),

      updatePetal4: (data) =>
        set((s) => ({ petal4_knowledges: { ...s.petal4_knowledges, ...data } })),

      updatePetal5: (data) =>
        set((s) => ({ petal5_salary: { ...s.petal5_salary, ...data } })),

      updatePetal6: (data) =>
        set((s) => ({ petal6_geography: { ...s.petal6_geography, ...data } })),

      updatePetal7: (data) =>
        set((s) => ({ petal7_purpose: { ...s.petal7_purpose, ...data } })),

      // ── Progress ────────────────────────────────────────────────────────────

      markPetalComplete: (petalId) =>
        set((s) => ({
          completedPetals: s.completedPetals.includes(petalId)
            ? s.completedPetals
            : [...s.completedPetals, petalId],
        })),

      // ── Reset ───────────────────────────────────────────────────────────────

      resetStore: () => set({ ...initialState, sessionId: generateId() }),

      // ── Selectors ───────────────────────────────────────────────────────────

      isComplete: (petalId) => get().completedPetals.includes(petalId),

      getCompletionPercentage: () => {
        const { completedPetals } = get();
        return Math.round((completedPetals.length / PETAL_IDS.length) * 100);
      },

      getAllTopItems: () => {
        const s = get();
        return {
          // People: preferred types of people to work with
          people: s.petal1_people.preferredTraits,

          // Conditions: preferred working conditions
          conditions: s.petal2_conditions.preferredConditions,

          // Skills: top skills + combined phrases
          skills: s.petal3_skills.topSkills,
          skillPhrases: s.petal3_skills.combinedPhrases,

          // Knowledges: top subject-matter areas
          knowledges: s.petal4_knowledges.topKnowledges,

          // Salary: the two key numbers
          minimumSalary: s.petal5_salary.minimumSalary,
          targetSalary: s.petal5_salary.targetSalary,
          responsibilityLevel: s.petal5_salary.responsibilityLevel,
          nonMonetaryRewards: s.petal5_salary.nonMonetaryRewards,

          // Geography: candidate locations
          locations: s.petal6_geography.candidateLocations,

          // Purpose: statement + themes
          purposeStatement: s.petal7_purpose.purposeStatement,
          impactThemes: s.petal7_purpose.impactThemes,
        };
      },
    }),
    {
      name: 'myflower-session',
      // Only persist data state — actions are recreated on every load
      partialize: (s) => ({
        sessionId: s.sessionId,
        completedPetals: s.completedPetals,
        petal1_people: s.petal1_people,
        petal2_conditions: s.petal2_conditions,
        petal3_skills: s.petal3_skills,
        petal4_knowledges: s.petal4_knowledges,
        petal5_salary: s.petal5_salary,
        petal6_geography: s.petal6_geography,
        petal7_purpose: s.petal7_purpose,
      }),
    }
  )
);

export { PETAL_IDS };
export default useFlowerStore;

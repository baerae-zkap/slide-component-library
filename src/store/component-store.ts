import { create } from 'zustand';
import type { CategorySlug } from '@/types';

interface ComponentState {
  selectedComponentId: string | null;
  selectedCategory: CategorySlug | null;
  componentProps: Record<string, Record<string, unknown>>;
  searchQuery: string;

  selectComponent: (id: string | null) => void;
  selectCategory: (category: CategorySlug | null) => void;
  updateProp: (componentId: string, key: string, value: unknown) => void;
  resetProps: (componentId: string) => void;
  getProps: (componentId: string, defaults: Record<string, unknown>) => Record<string, unknown>;
  setSearchQuery: (query: string) => void;
}

export const useComponentStore = create<ComponentState>((set, get) => ({
  selectedComponentId: null,
  selectedCategory: null,
  componentProps: {},
  searchQuery: '',

  selectComponent: (id) => set({ selectedComponentId: id }),

  selectCategory: (category) => set({ selectedCategory: category, selectedComponentId: null }),

  updateProp: (componentId, key, value) =>
    set((state) => ({
      componentProps: {
        ...state.componentProps,
        [componentId]: {
          ...state.componentProps[componentId],
          [key]: value,
        },
      },
    })),

  resetProps: (componentId) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [componentId]: _, ...rest } = state.componentProps;
      return { componentProps: rest };
    }),

  getProps: (componentId, defaults) => ({
    ...defaults,
    ...get().componentProps[componentId],
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

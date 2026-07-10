// contentStore is now a thin signal layer.
// Blog and loan data is fetched directly from Supabase by pages via lib/db/blogs & lib/db/loans.
import { create } from 'zustand';

interface ContentState {
  refreshSignal: number;
  triggerRefresh: () => void;
}

export const useContentStore = create<ContentState>()((set) => ({
  refreshSignal: 0,
  triggerRefresh: () => set(s => ({ refreshSignal: s.refreshSignal + 1 })),
}));

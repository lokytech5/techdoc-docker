import { create } from "zustand";

interface PageState {
    activePage: string;
}

interface PageActions {
    setActivePage: (page: string) => void;
}

const usePageStore = create<PageState & PageActions>((set) => ({
    activePage: 'home',
    setActivePage: (page: string) => {
        set({ activePage: page });
    },
}));


export default usePageStore;
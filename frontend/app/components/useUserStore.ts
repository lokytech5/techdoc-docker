import { create } from 'zustand';

interface User {
    _id: string;
    username: string;
    email?: string;
    isAdmin?: boolean;
  }
  
  interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
    loading: boolean;
    setUser: (user: User, token: string) => void;
    setError: (error: string) => void;
    logout: () => void;
    initializeUser: () => void;
    persistUser: () => void;
  }


  const useUserStore = create<UserState>((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    loading: true,
    setUser: (user, token) => set({
      user,
      token,
      isAuthenticated: !!user && !!token,
      error: null
    }),
    setError: (error) => set({ error }),
    logout: () =>{
    set({ user: null, token: null, isAuthenticated: false, error: null}),
    localStorage.removeItem('user');
  },
    initializeUser: () => {
      set({ loading: true });
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            set({
              user: parsedUser.user,
              token: parsedUser.token,
              isAuthenticated: !!parsedUser.user && !!parsedUser.token,
              loading: false
            });
            } catch (error) {
              localStorage.removeItem('user');
              set({ loading: false });
          }
      } else {
        set({ loading: false });
      }
  },
  persistUser: () => {
      const { user, token } = get();
      localStorage.setItem('user', JSON.stringify({ user, token}));
  },

  }))

  export default useUserStore
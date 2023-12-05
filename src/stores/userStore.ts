import { User } from 'src/models';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
    user: User | undefined;
}

interface Action {
    setUser: (user: User) => void;
    delUser: () => void;
}

export const useUserStore = create<UserStore & Action>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user) => {
                set(() => ({ user }));
            },
            delUser: () => {
                set(() => ({ user: undefined }));
            },
        }),
        {
            name: 'ae_user',
            storage: createJSONStorage(() => localStorage),
            version: import.meta.env.VITE_APP_VERSION,
        }
    )
);

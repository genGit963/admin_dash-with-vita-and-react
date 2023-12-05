import { Permission } from 'src/models';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PermissionStore {
    permissions: Permission[] | [];
}

interface Action {
    setPermissions: (permissions:Permission[]) => void;
    delPermissions: () => void;
}

export const usePermissionStore = create<PermissionStore & Action>()(
    persist(
        (set) => ({
            permissions: [],
            setPermissions: (permissions) => {
                set(() => ({ permissions }));
            },
            delPermissions: () => {
                set(() => ({ permissions: [] }));
            },
        }),
        {
            name: 'ae_permissions',
            storage: createJSONStorage(() => localStorage),
            version: import.meta.env.VITE_APP_VERSION,
        }
    )
);

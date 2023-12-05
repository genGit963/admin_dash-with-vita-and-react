import { Route, Routes } from 'react-router-dom';
import {
    LoginPage,
    RequestPasswordResetPage,
    ResetPasswordPage,
    VehiclePage,
    VehiclesPage,
    SignupPage,
    VehicleTypesPage,
    UsersPage,
    VehicleTypePage,
    UserPage,
    FeaturesPage,
    FeaturePage,
    PermissionsPage,
    PermissionPage,
    RolesPage,
    RolePage,
} from './pages';
import { NavigationBreadcrumb, ProtectedRoute } from './components';
import Dashboard from './pages/Dashboard';
import { useUserStore } from './stores';
import { AdminLayout, AuthLayout } from './layouts';

export function AppRoutes() {
    const { user } = useUserStore();
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="register/:verficationToken" element={<SignupPage />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route
                    path="reset-password"
                    element={<RequestPasswordResetPage />}
                />
            </Route>
            <Route element={<AuthLayout />}>
                <Route
                    path="reset-password/:token"
                    element={<ResetPasswordPage />}
                />
            </Route>
            <Route element={<ProtectedRoute user={user} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route element={<NavigationBreadcrumb />}>
                    <Route path="vehicles/" element={<VehiclesPage />} />
                    <Route path="vehicles/:action/:id?" element={<VehiclePage />} />
                    <Route path="vehicletypes" element={<VehicleTypesPage />} />
                    <Route path="vehicletypes/:action/:id?" element={<VehicleTypePage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/:action/:id?" element={<UserPage />} />
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="features/:action/:id?" element={<FeaturePage />} />
                    <Route path="permissions" element={<PermissionsPage/>} />
                    <Route path="permissions/:action/:id?" element={<PermissionPage />} />
                    <Route path="roles" element={<RolesPage/>} />
                    <Route path="roles/:action/:id?" element={<RolePage />} />
                    </Route>
                    <Route path="*" element={<p>Not yet implemented</p>} />
                </Route>
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

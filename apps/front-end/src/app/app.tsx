import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ClientsListPage } from '../features/clients/ClientsListPage';
import { ClientDetailPage } from '../features/clients/ClientDetailPage';
import { SelectedClientsPage } from '../features/selected/SelectedClientsPage';
import { Layout } from '../shared/components/Layout';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsListPage />} />
          <Route path="/clients/:id" element={<ClientDetailPage />} />
          <Route path="/selected" element={<SelectedClientsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

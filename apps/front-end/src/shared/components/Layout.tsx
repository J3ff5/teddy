import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store';

export function Layout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="brand">
          teddy<span className="brand-accent">.</span>
        </span>
        <nav className="topnav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/clients">Clientes</NavLink>
          <NavLink to="/selected">Clientes selecionados</NavLink>
          <button type="button" className="linklike" onClick={handleLogout}>
            Sair
          </button>
        </nav>
        <span className="greeting">
          Olá, <strong>{user?.email ?? 'Usuário'}</strong>!
        </span>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

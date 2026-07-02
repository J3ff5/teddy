import {
  LayoutDashboard,
  LogOut,
  Menu,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store';

export function Layout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const links = (
    <>
      <NavLink to="/dashboard">
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/clients">
        <Users size={18} />
        <span>Clientes</span>
      </NavLink>
      <NavLink to="/selected">
        <UserCheck size={18} />
        <span>Clientes selecionados</span>
      </NavLink>
      <button type="button" className="linklike navitem" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Sair</span>
      </button>
    </>
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="hamburger"
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>

        <span className="brand">
          teddy<span className="brand-accent">.</span>
        </span>

        <nav className="topnav">{links}</nav>

        <span className="greeting">
          Olá, <strong>{user?.email ?? 'Usuário'}</strong>!
        </span>
      </header>

      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <aside
            className="drawer"
            role="dialog"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <span className="brand">
                teddy<span className="brand-accent">.</span>
              </span>
              <button
                type="button"
                aria-label="Fechar menu"
                className="drawer-close"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="drawer-nav" onClick={() => setOpen(false)}>
              {links}
            </nav>
            <span className="drawer-greeting">
              Olá, <strong>{user?.email ?? 'Usuário'}</strong>!
            </span>
          </aside>
        </div>
      )}

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

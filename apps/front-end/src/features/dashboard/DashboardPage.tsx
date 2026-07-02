import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../shared/lib/format';
import { useClientStats } from '../clients/api';
import { useSelectedStore } from '../selected/store';

export function DashboardPage() {
  const { data, isLoading, isError } = useClientStats();
  const selectedCount = useSelectedStore((s) => s.clients.length);

  if (isLoading) return <p>Carregando...</p>;
  if (isError || !data)
    return <p className="form-error">Falha ao carregar o dashboard.</p>;

  return (
    <section className="dashboard">
      <div className="cards">
        <div className="stat-card">
          <span className="stat-label">Total de clientes</span>
          <span className="stat-value">{data.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Clientes selecionados</span>
          <span className="stat-value">{selectedCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cadastrados (últimos 5)</span>
          <span className="stat-value">{data.recent.length}</span>
        </div>
      </div>

      <div className="panel">
        <h2>Cadastros por dia</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.perDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#ec6724" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel">
        <h2>Últimos clientes</h2>
        <ul className="recent-list">
          {data.recent.map((client) => (
            <li key={client.id}>
              <Link to={`/clients/${client.id}`}>{client.name}</Link>
              <span>{formatCurrency(client.salary)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

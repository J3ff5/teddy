import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency } from '../../shared/lib/format';
import { useClient } from './api';

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: client, isLoading, isError } = useClient(id);

  if (isLoading) return <p>Carregando...</p>;
  if (isError || !client)
    return <p className="form-error">Cliente não encontrado.</p>;

  return (
    <section className="client-detail">
      <Link to="/clients" className="back-link">
        <ArrowLeft size={16} />
        Voltar para clientes
      </Link>
      <div className="detail-card">
        <h1>{client.name}</h1>
        <dl>
          <dt>Salário</dt>
          <dd>{formatCurrency(client.salary)}</dd>
          <dt>Empresa</dt>
          <dd>{formatCurrency(client.companyValue)}</dd>
          <dt>Acessos a este cadastro</dt>
          <dd>
            <span className="view-counter">{client.viewCount}</span>
          </dd>
        </dl>
      </div>
    </section>
  );
}

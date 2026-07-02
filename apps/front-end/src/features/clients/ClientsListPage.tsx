import { useState } from 'react';
import { useClients } from './api';
import { ClientCard } from './ClientCard';
import { ClientFormModal } from './ClientFormModal';
import { DeleteClientModal } from './DeleteClientModal';
import type { Client } from './types';

const PER_PAGE_OPTIONS = [8, 16, 24];

export function ClientsListPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);

  const { data, isLoading, isError } = useClients(page, limit);

  return (
    <section className="clients-page">
      <header className="list-header">
        <span>
          <strong>{data?.total ?? 0}</strong> clientes encontrados:
        </span>
        <label className="per-page">
          Clientes por página:
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </header>

      {isLoading && <p>Carregando...</p>}
      {isError && <p className="form-error">Falha ao carregar clientes.</p>}

      <div className="clients-grid">
        {data?.data.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        ))}
      </div>

      <button
        type="button"
        className="btn-outline create-btn"
        onClick={() => setCreating(true)}
      >
        Criar cliente
      </button>

      {data && data.totalPages > 1 && (
        <nav className="pagination" aria-label="Paginação">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={n === page ? 'page active' : 'page'}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
        </nav>
      )}

      {creating && <ClientFormModal onClose={() => setCreating(false)} />}
      {editing && (
        <ClientFormModal client={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <DeleteClientModal client={deleting} onClose={() => setDeleting(null)} />
      )}
    </section>
  );
}

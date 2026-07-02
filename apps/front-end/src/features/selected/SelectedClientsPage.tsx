import { ClientCard } from '../clients/ClientCard';
import { useSelectedStore } from './store';

export function SelectedClientsPage() {
  const clients = useSelectedStore((s) => s.clients);
  const clear = useSelectedStore((s) => s.clear);

  return (
    <section className="clients-page">
      <header className="list-header">
        <span>
          <strong>{clients.length}</strong> clientes selecionados
        </span>
      </header>

      {clients.length === 0 ? (
        <p>Nenhum cliente selecionado ainda.</p>
      ) : (
        <>
          <div className="clients-grid">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} selectionMode />
            ))}
          </div>
          <button type="button" className="btn-outline create-btn" onClick={clear}>
            Limpar clientes selecionados
          </button>
        </>
      )}
    </section>
  );
}

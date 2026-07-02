import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../shared/lib/format';
import { useSelectedStore } from '../selected/store';
import type { Client } from './types';

interface Props {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  /** When true, the primary action removes the client from the selection. */
  selectionMode?: boolean;
}

export function ClientCard({ client, onEdit, onDelete, selectionMode }: Props) {
  const navigate = useNavigate();
  const toggle = useSelectedStore((s) => s.toggle);
  const isSelected = useSelectedStore((s) => s.isSelected(client.id));

  return (
    <article className="client-card">
      <button
        type="button"
        className="client-card-body"
        onClick={() => navigate(`/clients/${client.id}`)}
        title="Ver detalhes"
      >
        <h3>{client.name}</h3>
        <p>Salário: {formatCurrency(client.salary)}</p>
        <p>Empresa: {formatCurrency(client.companyValue)}</p>
      </button>
      <div className="client-card-actions">
        <button
          type="button"
          aria-label={
            selectionMode || isSelected
              ? 'Remover da seleção'
              : 'Selecionar cliente'
          }
          className={isSelected ? 'icon-btn selected' : 'icon-btn'}
          onClick={() => toggle(client)}
        >
          {isSelected ? '−' : '+'}
        </button>
        {onEdit && (
          <button
            type="button"
            aria-label="Editar cliente"
            className="icon-btn"
            onClick={() => onEdit(client)}
          >
            <span aria-hidden="true">✏️</span>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            aria-label="Excluir cliente"
            className="icon-btn danger"
            onClick={() => onDelete(client)}
          >
            <span aria-hidden="true">🗑️</span>
          </button>
        )}
      </div>
    </article>
  );
}

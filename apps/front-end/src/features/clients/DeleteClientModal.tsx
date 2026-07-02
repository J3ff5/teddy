import { Modal } from '../../shared/components/Modal';
import { useDeleteClient } from './api';
import type { Client } from './types';

interface Props {
  client: Client;
  onClose: () => void;
}

export function DeleteClientModal({ client, onClose }: Props) {
  const remove = useDeleteClient();

  const onConfirm = () => {
    remove.mutate(client.id, { onSuccess: onClose });
  };

  return (
    <Modal title="Excluir cliente:" onClose={onClose}>
      <div className="client-form">
        <p>
          Você está prestes a excluir o cliente:{' '}
          <strong>{client.name}</strong>
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={onConfirm}
          disabled={remove.isPending}
        >
          {remove.isPending ? 'Excluindo...' : 'Excluir cliente'}
        </button>
      </div>
    </Modal>
  );
}

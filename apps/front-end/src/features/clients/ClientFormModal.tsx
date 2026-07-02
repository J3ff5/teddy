import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Modal } from '../../shared/components/Modal';
import { useCreateClient, useUpdateClient } from './api';
import type { Client } from './types';

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  salary: z.coerce.number({ message: 'Informe um número' }).min(0),
  companyValue: z.coerce.number({ message: 'Informe um número' }).min(0),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  client?: Client;
  onClose: () => void;
}

export function ClientFormModal({ client, onClose }: Props) {
  const isEdit = !!client;
  const create = useCreateClient();
  const update = useUpdateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: client
      ? {
          name: client.name,
          salary: client.salary,
          companyValue: client.companyValue,
        }
      : undefined,
  });

  const pending = create.isPending || update.isPending;

  const onSubmit = (values: FormValues) => {
    const done = { onSuccess: onClose };
    if (isEdit) {
      update.mutate({ id: client.id, input: values }, done);
    } else {
      create.mutate(values, done);
    }
  };

  return (
    <Modal
      title={isEdit ? 'Editar cliente:' : 'Criar cliente:'}
      onClose={onClose}
    >
      <form className="client-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Digite o nome:" {...register('name')} />
        {errors.name && <span className="field-error">{errors.name.message}</span>}

        <input
          type="number"
          step="0.01"
          placeholder="Digite o salário:"
          {...register('salary')}
        />
        {errors.salary && (
          <span className="field-error">{errors.salary.message}</span>
        )}

        <input
          type="number"
          step="0.01"
          placeholder="Digite o valor da empresa:"
          {...register('companyValue')}
        />
        {errors.companyValue && (
          <span className="field-error">{errors.companyValue.message}</span>
        )}

        <button type="submit" className="btn-primary" disabled={pending}>
          {isEdit ? 'Editar cliente' : 'Criar cliente'}
        </button>
      </form>
    </Modal>
  );
}

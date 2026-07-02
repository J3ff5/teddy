import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLogin } from './api';
import { useAuthStore } from './store';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const onSubmit = (values: FormValues) => {
    login.mutate(values, {
      onSuccess: () => navigate('/dashboard', { replace: true }),
    });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <span className="brand brand-lg">
          teddy<span className="brand-accent">.</span>
        </span>
        <h1>Olá, seja bem-vindo!</h1>

        <label>
          E-mail
          <input type="email" placeholder="Digite o seu e-mail:" {...register('email')} />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </label>

        <label>
          Senha
          <input type="password" placeholder="Digite a sua senha:" {...register('password')} />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </label>

        {login.isError && (
          <p className="form-error">E-mail ou senha inválidos.</p>
        )}

        <button type="submit" className="btn-primary" disabled={login.isPending}>
          {login.isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

import { cookies } from 'next/headers';
import { environments } from '@/src/environments/environments';
import { redirect } from 'next/navigation';
import { SubscriptionRequiredError } from '@/src/shared/utils/errors';

type Options = RequestInit & { auth?: boolean };



export async function serverFetch<T = unknown>(path: string, options: Options = {}) {
  const apiUrl = environments.apiUrl;
  if (!apiUrl) throw new Error('API_URL não definida');

  const headers = new Headers(options.headers);

  if (options.auth !== false) {
    const token = (await cookies()).get('token')?.value;
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (res.status === 401 || res.status === 403) {
    redirect('/login');
  }
if (res.status === 402) {
    const body = await res.json().catch(() => null)
    throw new SubscriptionRequiredError(body?.message)
}


  const text = await res.text();
  const data = text ? JSON.parse(text) as T : null as T;
  if (!res.ok) {
    const errorMessage = (data as { message?: string })?.message || 'Erro na requisição';
    throw new Error(errorMessage);
}

  return data;
}
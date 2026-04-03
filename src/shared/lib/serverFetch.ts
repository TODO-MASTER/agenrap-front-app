import { cookies } from 'next/headers';
import { environments } from '@/src/environments/environments';
import { redirect } from 'next/navigation';

type Options = RequestInit & { auth?: boolean };

export async function serverFetch(path: string, options: Options = {}) {
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
    redirect('/');
  }

  return res;
}
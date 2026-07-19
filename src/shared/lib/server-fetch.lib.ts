import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SubscriptionRequiredError } from '@/src/shared/utils/errors';
import { environments } from '@/src/environments/environments';

type Options = RequestInit & { auth?: boolean; _isRetry?: boolean; _freshToken?: string };

export async function serverFetch<T = unknown>(path: string, options: Options = {}): Promise<T> {
    const apiUrl = environments.apiUrl;
    if (!apiUrl) throw new Error('API_URL não definida');

    const cookieStore = await cookies();
    const headers = new Headers(options.headers);

    if (options.auth !== false) {
        const token = options._freshToken ?? cookieStore.get('token')?.value;
        if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers,
        cache: 'no-store',
        signal: options.signal ?? AbortSignal.timeout(15000),
    });

    if (res.status === 401 && !options._isRetry) {
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (refreshToken) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';
            const refreshRes = await fetch(`${appUrl}/api/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `refreshToken=${refreshToken}`
                },
            });

            if (refreshRes.ok) {
                const refreshData = await refreshRes.json();
                return serverFetch<T>(path, {
                    ...options,
                    _isRetry: true,
                    _freshToken: refreshData.token,
                });
            }
        }

        redirect('/login');
    }

    if (res.status === 403) {
        redirect('/login');
    }

    if (res.status === 402) {
        const body = await res.json().catch(() => null);
        throw new SubscriptionRequiredError(body?.message);
    }

    const text = await res.text();
    const data = text ? (JSON.parse(text) as T) : (null as T);

    if (!res.ok) {
        const errorMessage = (data as { message?: string })?.message || 'Erro na requisição';
        throw new Error(errorMessage);
    }

    return data;
}
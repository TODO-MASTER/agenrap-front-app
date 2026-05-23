export async function loginUser(values: any) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    const data = await response.json();
    if (!response.ok) {
        let message = 'Erro ao tentar logar';
        if (data.error) {
            try {
                const parsed = JSON.parse(data.error);
                message = parsed.message ?? message;
            } catch {
                message = data.error ?? message;
            }
        }
        throw new Error(message);
    }

    return data;
}
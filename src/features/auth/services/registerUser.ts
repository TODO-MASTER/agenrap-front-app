export async function registerUser(values: any) {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    const data = await response.json();

 

    return data;
}
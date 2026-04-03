export async function loginUser(values: any) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    const data = await response.json();

 

    return data;
}
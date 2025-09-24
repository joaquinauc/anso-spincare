let role;

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/get_role', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store' // Evita caché en la petición
        }
    });

    result = await response.json();

    role = result.role;
});

console.log(role)
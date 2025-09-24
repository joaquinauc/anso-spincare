document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/api/get_role', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store' // Evita caché en la petición
        }
    });

    result = await response.json();
    
    if (result.role === 'admin') {
        const buttonsContainer = document.querySelector('.buttons-container');
        const addUserButton = document.createElement('button');

        addUserButton.setAttribute('id', 'alta-usuario');
        addUserButton.textContent = 'Dar de alta a usuario';

        buttonsContainer.insertBefore(addUserButton, buttonsContainer.firstChild)
    }
});

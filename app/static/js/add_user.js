const userInfoContainer = document.querySelector('#user-info-container');
const editButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.close');
const addUserModal = document.querySelector('.modal-user');
const saveFormDataButton = document.querySelector('#saveFormDataBtn');
const addUserButton = document.querySelector('#addUserBtn');

const USER_INFO_LABELS = ['Nombres:', 'Apellido Paterno:', 'Apellido Materno:', 'Contraseña:', 'Rol:'];
const USER_INFO_DATA_ID = ['user-show-name', 'user-show-first-last-name', 'user-show-second-last-name', 'user-show-password', 'user-show-role']

for (let i = 0; i < USER_INFO_DATA_ID.length; i++) {
    const userInfoSubContainer = document.createElement('div');
    userInfoSubContainer.setAttribute('class', 'user-info-subcontainer');

    const userInfoLabel = document.createElement('label');
    userInfoLabel.setAttribute('class', 'user-info-label');
    userInfoLabel.textContent = USER_INFO_LABELS[i];

    const userInfoData = document.createElement('p');
    userInfoData.setAttribute('id', `${USER_INFO_DATA_ID[i]}`)

    userInfoSubContainer.appendChild(userInfoLabel);
    userInfoSubContainer.appendChild(userInfoData);
    userInfoContainer.appendChild(userInfoSubContainer);
}

// ABRIR MODAL
editButton.addEventListener('click', () => {
    addUserModal.setAttribute('style', 'display: flex;');
});

// CERRAR MODAL
closeModalButton.addEventListener('click', () => {
    addUserModal.setAttribute('style', 'display: none;');
});

window.addEventListener('click', event => {
    if (event.target.matches('.modal-user') && !event.target.closest('.modal-user-content')) {
        addUserModal.setAttribute('style', 'display: none;');
    }
});

// VARIABLES DE LOS DATOS QUE SE VEN FUERA DEL MODAL
const infoName = document.querySelector('#user-show-name');
const infoFirstLastName = document.querySelector('#user-show-first-last-name');
const infoSecondLastName = document.querySelector('#user-show-second-last-name');
const infoPassword = document.querySelector('#user-show-password');
const infoRole = document.querySelector('#user-show-role');

// GUARDAR INFO DEL MODAL
saveFormDataButton.addEventListener('click', () => {
    // VARIABLES DE LOS DATOS QUE INGRESES AL MODAL
    const nameInput = document.querySelector('#user-name');
    const firstLastNameInput = document.querySelector('#user-first-last-name');
    const secondLastNameInput = document.querySelector('#user-second-last-name');
    const passwordInput = document.querySelector('#user-password');
    const roleInput = document.querySelector('#user_role');

    // PASAR LOS DATOS DEL LOS INPUT DEL MODAL A LA INFORMACIÓN FUERA DEL MODAL
    infoName.textContent = nameInput.value;
    infoFirstLastName.textContent = firstLastNameInput.value;
    infoSecondLastName.textContent = secondLastNameInput.value;
    infoPassword.textContent = passwordInput.value;
    infoRole.textContent = roleInput.value;

    // CERRAR MODAL
    addUserModal.setAttribute('style', 'display: none;');
});

addUserButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_name', infoName.textContent);
    formData.append('user_first_last_name', infoFirstLastName.textContent);
    formData.append('user_second_last_name', infoSecondLastName.textContent);
    formData.append('user_password', infoPassword.textContent);
    formData.append('user_role', infoRole.textContent);
    // Necesita el CSRF TOKEN para que funcione el forms de Flask y pueda hacer la validación
    formData.append(
        'csrf_token',
        document.querySelector('[name=csrf_token]').value
    );

    try {
        const response = await fetch('/api/add_user', {
            method: 'POST',
            body: formData,
            headers: {
                'Cache-Control': 'no-store', // Evita caché en la petición
            },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            // 3. Redirección que no deja historial
            window.location.replace(result.redirect);
        } else {
            alert('Algo salió mal.');
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
    }
});

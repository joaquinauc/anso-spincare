const userInfoContainer = document.querySelector('#user-info-container');
const editButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.close');
const addUserModal = document.querySelector('.modal-user');
const saveFormDataButton = document.querySelector('#saveFormDataBtn');

const USER_INFO_LABELS = ['Nombres:', 'Apellido Paterno:', 'Apellido Materno:', 'Contraseña:', 'Rol:'];
const USER_INFO_DATA_ID = ['user-show-name', 'user-show-first-last-name', 'user-show-second-last-name', 'user-show-password', 'user-show-role']

for (let i = 0; i < USER_INFO_DATA_ID.length; i++) {
    const userInfoSubContainer = document.createElement('div');

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

// GUARDAR INFO DEL MODAL
saveFormDataButton.addEventListener('click', () => {
    // VARIABLES DE LOS DATOS QUE INGRESES AL MODAL
    const nameInput = document.querySelector('#user-name');
    const firstLastNameInput = document.querySelector('#user-first-last-name');
    const secondLastNameInput = document.querySelector('#user-second-last-name');
    const passwordInput = document.querySelector('#user-password');
    const roleInput = document.querySelector('#user_role');

    // VARIABLES DE LOS DATOS QUE SE VEN FUERA DEL MODAL
    const infoName = document.querySelector('#user-show-name');
    const infoFirstLastName = document.querySelector('#user-show-first-last-name');
    const infoSecondLastName = document.querySelector('#user-show-second-last-name');
    const infoPassword = document.querySelector('#user-show-password');
    const infoRole = document.querySelector('#user-show-role');

    // PASAR LOS DATOS DEL LOS INPUT DEL MODAL A LA INFORMACIÓN FUERA DEL MODAL
    infoName.textContent = nameInput.value;
    infoFirstLastName.textContent = firstLastNameInput.value;
    infoSecondLastName.textContent = secondLastNameInput.value;
    infoPassword.textContent = passwordInput.value;
    infoRole.textContent = roleInput.value;
});

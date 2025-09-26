const userInfoContainer = document.querySelector('#user-info-container');
const editButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.close');
const addUserModal = document.querySelector('.modal-user');

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

const userInfoContainer = document.querySelector('#user-info-container');

const USER_INFO_LABELS = ['Nombres:', 'Apellido Paterno:', 'Apellido Materno (Opcional):', 'Contraseña:', 'Rol'];
const USER_INFO_DATA_ID = ['user-show-name', 'user-show-first-last-name', 'user-show-second-last-name', 'user-show-password', 'user-show-role']

for (let i = 0; i < USER_INFO_DATA_ID.length; i++) {
    const userInfoSubContainer = document.createElement('div');

    const userInfoLabel = document.createElement('label');
    userInfoLabel.textContent = USER_INFO_LABELS[i];

    const userInfoData = document.createElement('p');
    userInfoData.setAttribute('id', `${USER_INFO_DATA_ID[i]}`)

    userInfoSubContainer.appendChild(userInfoLabel);
    userInfoSubContainer.appendChild(userInfoData);
    userInfoContainer.appendChild(userInfoSubContainer);
}


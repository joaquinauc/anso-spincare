const patientInfoContainer = document.querySelector('#patient-info-container');
const editButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.close');
const addPatientModal = document.querySelector('.modal-patient');

const PATIENT_INFO_LABELS = ['Nombre Completo:', 'Edad:', 'Sexo:', 'Teléfono:', 'Padecimiento:', 'Medicamentos:', 'Expediente No.:', 'Alergias:'];
const PATIENT_INFO_DATA_ID = ['patient-show-name', 'patient-show-age', 'patient-show-phone', 'patient-show-illness', 'patient-show-medicine', 'patient-show-expedient-number', 'patient-show-allergies']

for (let i = 0; i < PATIENT_INFO_DATA_ID.length; i++) {
    const patientInfoSubContainer = document.createElement('div');
    patientInfoSubContainer.setAttribute('class', 'patient-info-subcontainer');

    const patientInfoLabel = document.createElement('label');
    patientInfoLabel.setAttribute('class', 'patient-info-label');
    patientInfoLabel.textContent = PATIENT_INFO_LABELS[i];

    const patientInfoData = document.createElement('p');
    patientInfoData.setAttribute('id', `${PATIENT_INFO_DATA_ID[i]}`)

    patientInfoSubContainer.appendChild(patientInfoLabel);
    patientInfoSubContainer.appendChild(patientInfoData);
    patientInfoContainer.appendChild(patientInfoSubContainer);
}

// ABRIR MODAL
editButton.addEventListener('click', () => {
    addPatientModal.setAttribute('style', 'display: flex;');
});

// CERRAR MODAL
closeModalButton.addEventListener('click', () => {
    addPatientModal.setAttribute('style', 'display: none;');
});

window.addEventListener('click', event => {
    if (event.target.matches('.modal-patient') && !event.target.closest('.modal-patient-content')) {
        addPatientModal.setAttribute('style', 'display: none;');
    }
});

// VARIABLES DE LOS DATOS QUE SE VEN FUERA DEL MODAL
const infoName = document.querySelector('#patient-show-name');
const infoAge = document.querySelector('#patient-show-age');
const infoSex = document.querySelector('#patient-show-sex');
const infoPhone = document.querySelector('#patient-show-phone');
const infoIllness = document.querySelector('#patient-show-illness');
const infoMedicine = document.querySelector('#patient-show-illness');
const infoExpedient = document.querySelector('#patient-show-illness');
const infoAllergies = document.querySelector('#patient-show-illness');


